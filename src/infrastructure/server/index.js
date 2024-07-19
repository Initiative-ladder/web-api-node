import Fastify from 'fastify'


export const setupServer = () => {
    return Fastify();
};

export const startServer = async (server) => {
    try {
        await server.listen({ port: 3000 })
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
};
