import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as cron from 'node-cron';

@Injectable()
export class BotService implements OnModuleInit {
  private chatId: number | null = null;
  private bot: TelegramBot;

  constructor() {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined!');
    }

    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: true,
    });
  }

  async onModuleInit() {
    this.bot.onText(/\/start/, (msg) => {
      this.chatId = msg.chat.id;
      this.bot.sendMessage(
        msg.chat.id,
        'سلام! من یک ربات هستم که هر روز صبح پیامی برای شما ارسال می‌کنم.',
      );
    });

    this.scheduleDailyMessage();
  }

  private scheduleDailyMessage() {
    cron.schedule('0 9 * * *', () => {
      this.sendDailyMessage();
    });
  }

  private sendDailyMessage() {
    if (this.chatId) {
      this.bot.sendMessage(this.chatId, 'سلام');
    }
  }
}
