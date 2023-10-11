// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import TelegramBot from 'node-telegram-bot-api';
import { BotService } from './bot/bot.service';
import * as schedule from 'node-schedule';
import axios from "axios";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const botToken = '6510663671:AAEJJ_Ub7V5ls-xwuEQhtGQA-MrmgGOSbLk'; // Replace with your bot token
  const apiMethod = 'sendMessage';
  const url = `https://api.telegram.org/bot${botToken}/${apiMethod}`;
  const bot = new TelegramBot(botToken, { polling: true });
  let city;

  const botService = app.get(BotService);

  async function getCityName(latitude: number, longitude: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    const response = await axios.get(url);
    return response.data.address.city;
  }

  bot.onText(/\/subscribe/, (msg) => {
    const userId = msg.chat.id;
    botService.subscribeUser(userId);
    console.log('Subscribed user', userId);
    bot.sendMessage(
        userId,
        'Please share your location with me so I can send you weather updates.',
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: 'Share Location',
                  request_location: true,
                },
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        },
    );
    console.log('URL:', url);
  });

  bot.on('location', async (msg) => {
    const userId = msg.chat.id;
    const { latitude, longitude } = msg.location;

    city = await getCityName(latitude, longitude);

    botService.subscribeUser(userId);
    console.log('Subscribed user', userId);

    bot.sendMessage(
        userId,
        `Thank you for subscribing! You will now receive daily weather updates for ${city}.`,
    );
  });

  bot.onText(/\/unsubscribe/, (msg) => {
    const userId = msg.chat.id;
    botService.unsubscribeUser(userId);
    bot.sendMessage(
      userId,
      'You have unsubscribed from daily weather updates.',
    );
  });

  //Call sendDailyWeatherUpdates every day at a specific time
  //const rule = new schedule.RecurrenceRule();
  const rule = new schedule.RecurrenceRule();
  rule.hour = 17;
  rule.minute = 15;
  schedule.scheduleJob(rule, async () => {
    const subscribedUsers = Array.from(botService.getSubscribedUsers());
    for (const userId of subscribedUsers) {
      await botService.dispatchWeatherUpdates(bot, userId, city);
    }
  });

  await app.listen(3000);
}
bootstrap();
