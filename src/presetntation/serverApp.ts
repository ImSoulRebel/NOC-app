import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronAdapter } from './cron/cron-adapter';

class ServerApp {
  public static start() {
    console.log('Server application has started...');
    CronAdapter.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      // const url = 'http://localhost:3000';
      new CheckService(
        () => console.log(`Service at ${url} is available.`),
        (error: string) => console.error(`Service check failed: ${error}`),
      ).execute(url);
    });
  }
}

export { ServerApp };
