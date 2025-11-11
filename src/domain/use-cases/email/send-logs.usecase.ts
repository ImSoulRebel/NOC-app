import { Attachment } from 'nodemailer/lib/mailer';
import { EmailAdapter } from '../../../presentation/adapters/email/email.adapter';
import { LogRepository } from '../../repositories/log.repository';
import { LogEntity, LogLevel } from '../../entities/log.entitity';

interface SendLogEmailUseCase {
  execute(
    to: string | string[],
    subject: string,
    html: string,
    attachments?: Attachment[],
  ): Promise<boolean>;
}

export class SendLogsUseCase implements SendLogEmailUseCase {
  constructor(
    private readonly emailAdapter: EmailAdapter,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(
    to: string | string[],
    subject: string,
    html: string,
    attachments?: Attachment[],
  ): Promise<boolean> {
    try {
      const mailOptions = attachments
        ? { to, subject, html, attachments }
        : { to, subject, html };

      const sent = await this.emailAdapter.sendMail(mailOptions);

      if (!sent) {
        throw new Error('Failed to send log email.');
      }
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogLevel.HIGH,
        message: `Failed to send log email to ${to} with subject "${subject}": ${error}`,
        origin: 'SendLogsUseCase',
      });
      await this.logRepository.saveLog(log);
      return false;
    }
  }
}
