import 'dotenv/config';
import * as env from 'env-var';

export const PORT = env.get('PORT').required().asPortNumber();
export const MAILER_SERVICE = env.get('MAILER_SERVICE').required().asString();
export const MAILER_EMAIL = env.get('MAILER_EMAIL').required().asEmailString();
export const MAILER_SECRET_KEY = env
  .get('MAILER_SECRET_KEY')
  .required()
  .asString();
export const PROD = env.get('PROD').required().asBool();
export const MONGO_URL = env.get('MONGO_URL').required().asString();
export const MONGO_DB_NAME = env.get('MONGO_DB_NAME').required().asString();
export const MONGO_USER = env.get('MONGO_USER').required().asString();
export const MONGO_PASS = env.get('MONGO_PASS').required().asString();
