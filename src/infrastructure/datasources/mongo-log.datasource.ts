import { LogModel } from '../../data/mongo/models/log.model';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '../../domain/entities/log.entitity';

export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
    console.log('Log saved to MongoDB:', newLog);
  }

  async getLogs(severity: LogLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severity }).exec();
    return LogEntity.fromObjectsToEntities(logs);
  }
}
