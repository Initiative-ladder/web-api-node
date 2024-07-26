import fastifyIO from 'fastify-socket.io';
import { WebSocketController } from "./controller/index.js";

let controllerInstance = null;

export const getWebSocketController = () => {
    if (!controllerInstance) {
      throw new CodedError('Web Socket Server unitialized');
    }
    return controllerInstance;
  };

const configureWebSocketHandlers = (fastifyInstance) => {
    try {
      controllerInstance = new WebSocketController(fastifyInstance.io);
      controllerInstance.io.on('connection', (socket) => {
        getWebSocketController().connectSocket(socket);
        socket.emit('message', 'web socket connected');
        socket.on('disconnect', () => {
          getWebSocketController().disconnectSocket(socket);
        });
      });
      console.info('⚡️ Web socket initalized');
    } catch (error) {
      console.error(error);
    }
  };

export const startWebsocket = (fastifyInstance) => {
    fastifyInstance.register(fastifyIO);
    // wait for server inti to configure handlers
    fastifyInstance.ready().then(() => {
      configureWebSocketHandlers(fastifyInstance);
    });
  };