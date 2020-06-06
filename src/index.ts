import fastify from "fastify";
import { ApolloServer } from 'apollo-server-fastify';
import { Server, IncomingMessage, ServerResponse } from "http";

import connection from './connection';
import appGraphQL from './graphql'

// const { DB_HOST, DB_PORT, DB_NAME, PORT } = process.env;


// mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true });
// const { connection } = mongoose
// connection.on('error', err => {
//   console.error(err);
//   process.exit(1);
// });
// connection.once('open', () => {
//   console.log('Database connection established');
// });

const { NODE_ENV, PORT } = process.env

const app: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: NODE_ENV !== "production" });

const gqlServer = new ApolloServer({
  ...appGraphQL
});

(async () => {
  app.register(gqlServer.createHandler());
  try {
    await connection();
    const address = await app.listen(parseInt(PORT || "3000"), "::");
    app.log.info(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
  }
})();
