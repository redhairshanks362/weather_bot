import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [BotService, ConfigService],
  controllers: [BotController],
})
export class BotModule {}
