import { CronJob } from 'cron';

type CronJobType = string | Date;
type CronOnTickType = () => void;

export class CronAdapter {
  static createJob(cronTime: CronJobType, onTick: CronOnTickType): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();

    return job;
  }

  public static scheduleJobs() {
    console.log('Cron jobs have been scheduled...');
  }
}
