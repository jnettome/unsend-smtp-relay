const { SMTPServer } = require("smtp-server");
const axios = require("axios");
const { simpleParser } = require("mailparser");

const AUTH_USERNAME = process.env.AUTH_USERNAME || 'unsend';
const UNSEND_BASE_URL = process.env.UNSEND_BASE_URL || 'https://unsend.dev/';

async function sendEmailToUnsend(emailData, apiKey) {
  try {
    const url = new URL("/api/v1/emails", UNSEND_BASE_URL);
    const response = await axios.post(url.href, emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Unsend API response:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Unsend API error response:", error.response?.data);
      throw new Error(`Failed to send email: ${error.response?.data?.error?.message || "Unknown error from server: " + JSON.stringify(error.response.data)}`);
    } else {
      console.error("Error message:", error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}

const createSMTPServer = (port) => {
  const server = new SMTPServer({
    authOptional: false,
    onAuth(auth, session, callback) {
      if (auth.username === AUTH_USERNAME && auth.password) {
        callback(null, { user: auth.password });
      } else {
        callback(new Error("Authentication failed"));
      }
    },
    onData(stream, session, callback) {
      simpleParser(stream, async (err, parsed) => {
        if (err) {
          console.error("Error parsing email:", err);
          return callback(err);
        }

        if (!session.user) {
          console.error("No API key found in session");
          return callback(new Error("No API key found in session"));
        }

        const emailObject = {
          to: Array.isArray(parsed.to) ? parsed.to.map(addr => addr.text).join(", ") : parsed.to?.text,
          from: Array.isArray(parsed.from) ? parsed.from.map(addr => addr.text).join(", ") : parsed.from?.text,
          subject: parsed.subject,
          text: parsed.text || '',
          html: parsed.html || '',
          replyTo: parsed.replyTo?.text,
          attachments: parsed.attachments.map(attachment => ({
            filename: attachment.filename,
            content: attachment.content.toString('base64') // Convert Buffer to base64 string
          })),
          messageId: parsed.messageId,
        };

        try {
          await sendEmailToUnsend(emailObject, session.user);
          callback();
        } catch (error) {
          console.error("Failed to send email:", error.message);
          callback(error);
        }
      });
    },
  });

  server.on('error', (err) => {
    console.error("SMTP server error:", err);
    if (err.code === 'ERR_SSL_TLSV1_ALERT_UNKNOWN_CA') {
      console.error("SSL/TLS error: Unknown CA. This might be due to a misconfiguration in the client or server.");
    }
  });

  return server;
};

const server587 = createSMTPServer(587);
server587.listen(587, () => {
  console.log("SMTP server is running on port 587");
});
