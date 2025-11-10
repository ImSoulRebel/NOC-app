import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '../../domain/entities/log.entitity';
import { LogRepository } from '../../domain/repositories/log.repository';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly dataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.dataSource.saveLog(log);
  }
  async getLogs(severity: LogLevel): Promise<LogEntity[]> {
    return this.dataSource.getLogs(severity);
  }
}
