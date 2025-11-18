import 'reflect-metadata';
import { MONGO_DB_NAME, MONGO_URL } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import { PostgresDataSource } from './data/postgres/data-source';
import {
  LogModel as PostgresLogModel,
  SeverityLevel,
} from './data/postgres/models/log.model';
import { ServerApp } from './presentation/serverApp';

(async () => {
  main();
})();

async function main() {
  // Conectar a MongoDB
  await MongoDatabase.connect({
    mongoUrl: MONGO_URL,
    dbName: MONGO_DB_NAME,
  });

  // Conectar a PostgreSQL con TypeORM
  await PostgresDataSource.initialize();
  console.log('Connected to PostgreSQL successfully');

  // Crear un log de prueba en PostgreSQL
  const logRepository = PostgresDataSource.getRepository(PostgresLogModel);
  const newLog = logRepository.create({
    level: SeverityLevel.HIGH,
    message: 'Test log message from TypeORM',
    origin: 'App.ts',
  });

  await logRepository.save(newLog);
  console.log('New log created in PostgreSQL:', newLog);

  ServerApp.start();
}
