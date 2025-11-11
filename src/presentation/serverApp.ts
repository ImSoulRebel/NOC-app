import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendLogsUseCase } from '../domain/use-cases/logs/email/send-logs.usecase';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronAdapter } from './adapters/cron/cron-adapter';
// import { EmailAdapter } from './adapters/email/email.adapter';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

export class ServerApp {
  public static start() {
    // const emailAdapter = new EmailAdapter(fileSystemLogRepository);

    // const sendLogsUseCase = new SendLogsUseCase(
    //   emailAdapter,
    //   fileSystemLogRepository,
    // );

    // sendLogsUseCase.execute(

    //   'chrystianmichell@hotmail.com',
    //   'Test Email',
    //   '<h1>Hello World</h1>',
    //   [
    //     {
    //       filename: 'logs-all.log',
    //       path: './logs/logs-low.log',
    //     },
    //     {
    //       filename: 'logs-medium.log',
    //       path: './logs/logs-medium.log',
    //     },
    //     {
    //       filename: 'logs-high.log',
    //       path: './logs/logs-high.log',
    //     },
    //   ],
    // );

    console.log('Server application has started...');
    CronAdapter.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      // const url = 'http://localhost:3000';
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Service at ${url} is available.`),
        (error: string) => console.error(`Service check failed: ${error}`),
      ).execute(url);
    });
  }
}
