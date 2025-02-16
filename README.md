# SMTP Proxy to Unsend API (unsend-smtp-relay)

This project implements a simple SMTP server that proxies incoming emails to the [Unsend](https://unsend.dev/) API. Emails received by the server are parsed and forwarded to Unsend via their API.

It runs as a docker container.

## Features
- Runs an SMTP server on port 587
- Requires authentication using a username and API key as password
- Parses incoming emails and forwards them to Unsend API
- Supports attachments (converted to base64 format)
- Logs responses and errors for debugging

## How It Works

1. The SMTP server listens on port `587` (or `8587` when using Docker).
2. Clients must authenticate using `AUTH_USERNAME` and an API key as the password.
3. Incoming emails are parsed and structured.
4. The email content, including attachments (base64-encoded), is sent to the Unsend API.
5. Responses and errors are logged.


## Configuration

Set the following environment variables:

```sh
AUTH_USERNAME=unsend
UNSEND_BASE_URL=https://your-selfhosted.unsend-instance.com/
```

- `AUTH_USERNAME`: The username required for SMTP authentication.
- `UNSEND_BASE_URL`: The base URL for the Unsend API.

## Running in Docker

```sh
docker run -p 8587:587 -e AUTH_USERNAME=unsend -e UNSEND_BASE_URL=https://self.hosted.dev/ jnettome/unsend-smtp-relay:latest
```

### Docker Support

To run the server using Docker, use the provided `Dockerfile`:

1. Build the Docker image:
   ```sh
   docker build -t smtp-relay .
   ```

2. Run the container:
   ```sh
   docker run -p 8587:587 smtp-relay
   ```

### Development

## Requirements
- Node.js (latest LTS recommended)
- `npm` or `yarn`
- Docker (for containerized deployment)

1. Clone the repository:
   ```sh
   git clone https://github.com/jnettome/unsend-smtp-relay.git
   cd unsend-smtp-relay
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the SMTP server:
   ```sh
   node server.js
   ```


### Testing the SMTP Server

You can test the SMTP server using [`swaks`](https://linux.die.net/man/1/swaks):

```sh
swaks --to destination@email.com --from your-email@valid-domain.com --server localhost --port 8587 --auth LOGIN --auth-user unsend --auth-password "us_e54732190832190832_API_KEY" --data "Subject: Test Email\n\nThis is a test." --tls
```

### Dependencies
- [smtp-server](https://www.npmjs.com/package/smtp-server)
- [axios](https://www.npmjs.com/package/axios)
- [mailparser](https://www.npmjs.com/package/mailparser)
