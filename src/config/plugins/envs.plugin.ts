import 'dotenv/config';
import * as env from 'env-var';

export const PORT = env.get('PORT').required().asPortNumber();
export const MAILER_SERVICE = env.get('MAILER_SERVICE').required().asString();
export const MAILER_EMAIL = env.get('MAILER_EMAIL').required().asEmailString();
export const MAILER_SECRET_KEY = env
  .get('MAILER_SECRET_KEY')
  .required()
  .asString();
