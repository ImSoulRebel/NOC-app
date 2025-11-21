import { PostgresDataSource } from '../../data/postgres/data-source';
import { LogModel, SeverityLevel } from '../../data/postgres/models/log.model';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '../../domain/entities/log.entitity';

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = new LogModel();
    newLog.message = log.message;
    newLog.origin = log.origin;
    newLog.level = level;
    newLog.createdAt = log.createdAt;

    await PostgresDataSource.manager.save(newLog);
    console.log('Postgres Log created:', newLog.id);
  }

  async getLogs(severity: LogLevel): Promise<LogEntity[]> {
    const level = severityEnum[severity];

    const dbLogs = await PostgresDataSource.manager.find(LogModel, {
      where: { level },
    });

    return dbLogs.map((dbLog) =>
      LogEntity.fromObjectToEntity({
        ...dbLog,
        level: dbLog.level.toLowerCase(),
      }),
    );
  }
}
