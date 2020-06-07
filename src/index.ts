import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { RedisCache } from "apollo-server-cache-redis";
import { Server, IncomingMessage, ServerResponse } from "http";

import connection from "./connection";
import appGraphQL from "./graphql";

const { NODE_ENV, PORT, REDIS_HOST, REDIS_PORT } = process.env;

const app: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: NODE_ENV !== "production" });

(async () => {
  try {
    await connection();
    const address = await app
      .register(
        new ApolloServer({
          ...appGraphQL,
          cache: new RedisCache({
            host: REDIS_HOST,
            port: REDIS_PORT,
          }),
        }).createHandler()
      )
      .listen(parseInt(PORT || "3000"), "::");
    app.log.info(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
  }
})();
