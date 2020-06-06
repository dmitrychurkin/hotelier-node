import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

export default {
  database: {
    URI: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  }
};