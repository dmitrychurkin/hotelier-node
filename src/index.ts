import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import connection from "./connection";
import appGraphQL from "./graphql";
import config from "./config";

const { env, port } = config.global;

const app: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: env !== "production" });

(async () => {
  try {
    const [cache] = await connection();
    const address = await app
      .register(
        new ApolloServer({
          ...appGraphQL,
          cache,
        }).createHandler()
      )
      .listen(parseInt(port || "3000"), "::");
    app.log.info(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
  }
})();
