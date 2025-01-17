import { setupRoutes } from './routes/index.js';
import { setupServer, startServer} from './infrastructure/server/index.js'
import { config } from 'dotenv';
import { startWebsocket } from './infrastructure/sockets/index.js';

config();
const server = setupServer();
setupRoutes(server);
startServer(server);
startWebsocket(server);

// /dm/login login
// /dm/logout logout
// /dm/register register

// /dm/board get board
// /dm/board/:charId edit character
// /dm/board/:charId/remove delete character
// /dm/board/add add character
// /dm/board/reset wipe board

// /player/connect/:boardId get list of characters on board
// /player/:charcterId/set set the board character as the player
// /player/:characterId/edit update name/description/status info
// /player/message/:playerId send message to player

// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })