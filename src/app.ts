import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: process.env.NODE_ENV !== 'production' });

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
};

server.get('/', opts, (req, res) => {
  res.code(200).send({ pong: 'server works!' });
});


server.listen(Number.parseInt(process.env.PORT || '3000'), '::', (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening on ${address}`);
});

process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});
