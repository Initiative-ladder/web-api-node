import Fastify from 'fastify'
import { env } from '../../utils/env/index.js';

export const setupServer = () => {
    return Fastify();
};

export const startServer = async (server) => {
    try {
        console.info('⚡️ Server running on port ' + env('PORT'))
        await server.listen({ port: env('PORT') })
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
};
