# LPU Bot Prototype

Application entry point is app.js.

## Local Setup

1. Clone the repo and run `npm install`.
2. Create a `.env` file and write all the environment variables. Contact the main project maintainer for the environment variables.
3. Run `npm run start:dev` to start in development mode.
4. Install and setup ngrok locally.
5. Run `ngrok http 3000 --region us` once setup is complete. You should see something like this. Copy the forwarding address.
![Ngrok Running](./media/ngrok-running.png)
6. Open [Facebook Developer Dashboard](https://developers.facebook.com/apps/1329219284526923/whatsapp-business/wa-settings/?business_id=946944139806447). You should see something like this. Click on the `edit` button and paste the forwarding address copied in the 5th step.
![Facebook Developer Dashboard](./media/meta-developer-webhook-configuration.png)
7. Add your number if not previously added by clicking on the `Manage phone numbers` button.

## Webhook Routes Info

1. `GET receive`: Verifies the applicon
2. `POST receive`: Captures the messages

## Folder Usage

1. `scripts`: Consists of scripts to check parts of the application like testing webhook connection with the Meta API, connection with the database, etc.

2. `media`: Consists of the images used in the README file.