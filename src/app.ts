import { MONGO_DB_NAME, MONGO_URL } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import { LogModel } from './data/mongo/models/log.model';
import { ServerApp } from './presentation/serverApp';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: MONGO_URL,
    dbName: MONGO_DB_NAME,
  });

  ServerApp.start();
}
