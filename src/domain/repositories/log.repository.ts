import { LogEntity, LogLevel } from '../entities/log.entitity';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severity: LogLevel): Promise<LogEntity[]>;
}
