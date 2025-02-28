import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnModuleInit {
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
  onModuleInit() {
    console.log("@@",process.env.TELEGRAM_BOT_TOKEN )
    this.bot.on(
      'message',
      this.onReceivedMessageHandler.bind(this) as (
        message: TelegramBot.Message,
        metadata: TelegramBot.Metadata,
      ) => void,
    );
  }

  private async onReceivedMessageHandler(
    message: TelegramBot.Message,
    metadata: TelegramBot.Metadata,
  ) {
    console.log("@@@");
  }
}
