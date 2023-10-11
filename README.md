# Testing the Telegram Bot

This guide provides instructions on how to test the deployed Telegram bot powered by a Nest.js application on the Cyclic platform. The bot is designed to provide daily weather updates. 

Please note that the bot is live and accessible via the deployed Nest.js app on Cyclic.

Deployed App Link - https://real-plum-eagle-tutu.cyclic.app/
Telegram Bot - @jonsnow362_bot

## Step 1: Subscription

1. Access the bot by visiting the deployed Nest.js app on Cyclic.
2. Click on the '/subscribe' endpoint.
3. After clicking '/subscribe,' the bot will ask for your location. This step is essential to provide you with accurate weather updates.
4. Click "Share Location" to allow the bot to access your location. 

   > **Note:** Make sure that you have configured your Telegram privacy settings to allow the bot to access your location always.

5. Upon successfully sharing your location, you'll be subscribed to receive daily weather updates.

## Step 2: Admin Panel

1. The `/admin` route is configured with Google authentication, ensuring the security of the admin panel. To access it, use the following link: [Your App URL]/admin.
2. You will be prompted to sign in using your Google account. 
3. Once you are authenticated, you can access the admin panel for further configuration or management.

## Note

The bot has been configured to send daily weather updates. If you are subscribed and have allowed location access, you will receive daily weather updates automatically.

Please keep in mind that the bot may send updates at a specific time of day which is 9:15 am, which can be configured in the code. Make sure to check when the updates are scheduled and be prepared to receive the daily weather information.

Thank you for using our Telegram bot. If you encounter any issues or have questions, please feel free to contact our support team for assistance.

Happy testing! 🌦️🤖
