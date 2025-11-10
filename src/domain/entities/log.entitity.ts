export enum LogLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class LogEntity {
  message: string;
  level: LogLevel;
  createdAt: Date;

  constructor(message: string, level: LogLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJSONtoEntity(json: string): LogEntity {
    const obj = JSON.parse(json);
    const log = new LogEntity(obj.message, obj.level);
    log.createdAt = new Date(obj.createdAt);
    return log;
  }

  static fromJSONArrayToEntities(jsonArray: string[]): LogEntity[] {
    return jsonArray.map((json) => LogEntity.fromJSONtoEntity(json));
  }
}
