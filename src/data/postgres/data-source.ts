import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../../config/plugins/envs.plugin';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true, // Auto-sincronizar en desarrollo (cambiar a false en producción)
  logging: false,
  entities: [__dirname + '/models/*.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  subscribers: [],
});
