/// <reference types="node" />
import * as fs from 'fs';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '../../domain/entities/log.entitity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath: string = 'logs/logs-low.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

  constructor() {
    this.createLogsFilesIfNotExist();
  }

  private createLogsFilesIfNotExist = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      },
    );
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logString = JSON.stringify(log) + '\n';
    fs.appendFileSync(this.allLogsPath, logString);
    if (log.level === LogLevel.MEDIUM || log.level === LogLevel.HIGH) {
      fs.appendFileSync(
        log.level === LogLevel.MEDIUM ? this.mediumLogsPath : this.highLogsPath,
        logString,
      );
    }
    ``;
  }

  private readLogsFromFile(filePath: string): LogEntity[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    const logLines = data
      .trim()
      .split('\n')
      .filter((line) => line.length > 0);
    return LogEntity.fromJSONArrayToEntities(logLines);
  }

  async getLogs(level: LogLevel): Promise<LogEntity[]> {
    switch (level) {
      case LogLevel.LOW:
        return this.readLogsFromFile(this.allLogsPath);
      case LogLevel.MEDIUM:
        return this.readLogsFromFile(this.mediumLogsPath);
      case LogLevel.HIGH:
        return this.readLogsFromFile(this.highLogsPath);
      default:
        throw new Error('Invalid log level');
    }
  }
}
