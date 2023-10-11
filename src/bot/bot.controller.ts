// src/bot/bot.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get('subscribe/:userId')
  subscribe(@Param('userId') userId: number) {
    this.botService.subscribeUser(userId);
    return `User ${userId} subscribed for daily weather updates.`;
  }

  @Get('unsubscribe/:userId')
  unsubscribe(@Param('userId') userId: number) {
    this.botService.unsubscribeUser(userId);
    return `User ${userId} unsubscribed from daily weather updates.`;
  }

  @Get('status/:userId')
  getStatus(@Param('userId') userId: number) {
    const isSubscribed = this.botService.isUserSubscribed(userId);
    return `User ${userId} is ${
      isSubscribed ? 'subscribed' : 'not subscribed'
    } to weather updates.`;
  }
}
