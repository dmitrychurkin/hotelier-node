import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  REDIS_HOST,
  REDIS_PORT,
  NODE_ENV,
  PORT,
} = process.env;

export default {
  database: {
    URI: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  global: {
    env: NODE_ENV,
    port: PORT,
  },
};
