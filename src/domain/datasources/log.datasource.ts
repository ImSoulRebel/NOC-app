import { LogEntity, LogLevel } from '../entities/log.entitity';

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severity: LogLevel): Promise<LogEntity[]>;
}
