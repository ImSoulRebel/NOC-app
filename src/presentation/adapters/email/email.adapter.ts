import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { LogRepository } from '../../../domain/repositories/log.repository';
import {
  MAILER_EMAIL,
  MAILER_SECRET_KEY,
  MAILER_SERVICE,
} from '../../../config/plugins/envs.plugin';
import { LogEntity, LogLevel } from '../../../domain/entities/log.entitity';

interface MailOptions {
  from?: string; // Opcional: si no se provee se usa MAILER_EMAIL
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export class EmailAdapter {
  private transporter = nodemailer.createTransport({
    service: MAILER_SERVICE,
    auth: {
      user: MAILER_EMAIL,
      pass: MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendMail(options: MailOptions): Promise<boolean> {
    const {
      from = MAILER_EMAIL,
      to,
      subject,
      html,
      attachments = [],
    } = options;

    try {
      await this.transporter.sendMail({ from, to, subject, html, attachments });

      const log = new LogEntity({
        level: LogLevel.LOW,
        message: `Email sent to ${to} with subject "${subject}"`,
        origin: 'EmailAdapter',
      });
      await this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogLevel.HIGH,
        message: `Failed to send email to ${to} with subject "${subject}": ${error}`,
        origin: 'EmailAdapter',
      });
      await this.logRepository.saveLog(log);
      return false;
    }
  }
}
