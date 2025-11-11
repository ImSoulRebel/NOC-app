export enum LogLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface LogEntityOptions {
  message: string;
  level: LogLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  message: string;
  level: LogLevel;
  createdAt: Date;
  origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, createdAt, origin } = options;

    this.message = message;
    this.level = level;
    this.createdAt = createdAt ? createdAt : new Date();
    this.origin = origin;
  }

  static fromJSONtoEntity(json: string): LogEntity {
    const obj = JSON.parse(json);
    const log = new LogEntity({
      message: obj.message,
      level: obj.level,
      createdAt: obj.createdAt ? new Date(obj.createdAt) : new Date(),
      origin: 'log.entity.ts',
    });

    return log;
  }

  static fromJSONArrayToEntities(jsonArray: string[]): LogEntity[] {
    return jsonArray.map((json) => LogEntity.fromJSONtoEntity(json));
  }
}
