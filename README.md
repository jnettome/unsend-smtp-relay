docker run -p 8025:25 -p 8587:587 smtp-relay



swaks --to hi@omeujp.com --from jp@pixta.me --server localhost --port 8587 --auth LOGIN --auth-user unsend --auth-password "us_e54715p6ov_50d074b6fcd1784c76a37e3b79287ca5" --data "Subject: Test Email\n\nThis is a test." --tls







Received email: {
  attachments: [],
  headers: Map(8) {
    'date' => 2025-02-15T18:36:52.000Z,
    'from' => {
      value: [Array],
      html: '<span class="mp_address_group"><span class="mp_address_name">pixta</span> &lt;<a href="mailto:time@pixta.me" class="mp_address_email">time@pixta.me</a>&gt;</span>',
      text: '"pixta" <time@pixta.me>'
    },
    'to' => {
      value: [Array],
      html: '<span class="mp_address_group"><a href="mailto:hi@joaonetto.me" class="mp_address_email">hi@joaonetto.me</a></span>',
      text: 'hi@joaonetto.me'
    },
    'message-id' => '<67b0dec4cf84c_1100e1dd89505b@beanchine.mail>',
    'subject' => 'pixta: código 123456 ✨',
    'mime-version' => '1.0',
    'content-type' => { value: 'multipart/alternative', params: [Object] },
    'content-transfer-encoding' => '7bit'
  },
  headerLines: [
    { key: 'date', line: 'Date: Sat, 15 Feb 2025 15:36:52 -0300' },
    { key: 'from', line: 'From: pixta <time@pixta.me>' },
    { key: 'to', line: 'To: hi@joaonetto.me' },
    {
      key: 'message-id',
      line: 'Message-ID: <67b0dec4cf84c_1100e1dd89505b@beanchine.mail>'
    },
    {
      key: 'subject',
      line: 'Subject: =?UTF-8?Q?pixta:_c=C3=B3digo_123456_=E2=9C=A8?='
    },
    { key: 'mime-version', line: 'Mime-Version: 1.0' },
    {
      key: 'content-type',
      line: 'Content-Type: multipart/alternative;\r\n' +
        ' boundary="--==_mimepart_67b0dec4cec66_1100e1dd894913";\r\n' +
        ' charset=UTF-8'
    },
    {
      key: 'content-transfer-encoding',
      line: 'Content-Transfer-Encoding: 7bit'
    }
  ],
  html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
    '<html lang="