import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as cron from 'node-cron';
import axios from 'axios';

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
        '🌿 سلام و رحمت خدا بر شما! هر روز یک آیه از قرآن کریم برات می‌فرستم تا روزت با یاد خدا پر برکت باشه. 🙏📖',
      );
    });

    this.scheduleDailyMessage();
  }

  private scheduleDailyMessage() {
    cron.schedule('0 9 * * *', () => {
      this.sendDailyMessage();
    });
  }

  private async sendDailyMessage() {
    if (!this.chatId) return;

    try {
      const randomAyah = Math.floor(Math.random() * 6237) + 1;

      const arResponse = await axios.get(
        `${process.env.QURAN_BASE_URL}/v1/ayah/${randomAyah}/ar.asad`,
      );
      const faResponse = await axios.get(
        `${process.env.QURAN_BASE_URL}/v1/ayah/${randomAyah}/fa.asad`,
      );

      const message = `${arResponse.data.data.text}\n\n${faResponse.data.data.text}`;
      await this.bot.sendMessage(this.chatId, message);
    } catch (error) {
      console.error('Error fetching Quran verses:', error);
    }
  }
}
