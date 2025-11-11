import { LogEntity, LogLevel } from '../../entities/log.entitity';
import { LogRepository } from '../../repositories/log.repository';
interface CheckServiceInterface {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceInterface {
  constructor(
    private readonly LogRepository: LogRepository,
    private readonly successCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}
  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on service check: ${url}`);
      }
      const log = new LogEntity({
        message: `Service check successful: ${url}`,
        level: LogLevel.LOW,
        origin: 'check-service.ts',
      });
      await this.LogRepository.saveLog(log);
      this.successCallback();
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Service check failed: ${url} - ${(error as Error).message}`,
        level: LogLevel.HIGH,
        origin: 'check-service.ts',
      });
      await this.LogRepository.saveLog(log);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
