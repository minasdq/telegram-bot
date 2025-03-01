import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as cron from 'node-cron';
import fa from './fa.json';

@Injectable()
export class BotService implements OnModuleInit {
  private chatId: number | null = null;
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
  
  onModuleInit() {
    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(msg.chat.id, fa.welcome);
    });
    this.scheduleDailyMessage();
  }

  private scheduleDailyMessage() {
    cron.schedule('0 9 * * *', () => {
      this.sendDailyMessage();
    });
  }

  private sendDailyMessage() {
    this.bot.sendMessage(this.chatId, fa.newMessage);
  }
}
