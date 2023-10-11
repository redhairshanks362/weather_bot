// src/bot/bot.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config'; // Add this line
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService {
  private subscribedUsers = new Set<number>();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  subscribeUser(userId: number): void {
    this.subscribedUsers.add(userId);
  }

  unsubscribeUser(userId: number): void {
    this.subscribedUsers.delete(userId);
  }

  isUserSubscribed(userId: number): boolean {
    return this.subscribedUsers.has(userId);
  }
  async dispatchWeatherUpdates(bot: TelegramBot, userId: number, city: string): Promise<void> {

    const weatherApiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const apiKey = 'XL5DDPLKE2FBLUKXG3JFTJBKG';
    //const city = "Pune"

    try {
      const response = await this.httpService
          .get(weatherApiUrl, {
            params: {
              key: apiKey,
              unitGroup: 'uk',
              include: 'days',
              contentType: 'json',
              location: city,
            },
          })
          .toPromise();


      console.log('Weather API response:', response.data);

      const weatherData = response.data;
      const today = new Date().toISOString().slice(0, 10);
      const todayWeather = weatherData.days.find(day => day.datetime === today);

      if (todayWeather) {
        const temperature = todayWeather.temp;
        const message = `Good morning! Here's the weather update for ${city}:\nTemperature: ${temperature}°C.`;

        console.log('Sending message:', message);
        for (const userId of this.subscribedUsers) {
          await bot.sendMessage(userId, message);
        }
      } else {
        console.log(`No weather data found for ${today}.`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  getSubscribedUsers(): Set<number> {
    return this.subscribedUsers;
  }
}
