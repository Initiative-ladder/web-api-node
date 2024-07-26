/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server, Socket } from 'socket.io';

const getBoardRoomKey = (boardId) => `BOARD-${boardId}`;
// const getGuestRoomKey = (guestId) => `GUEST-${guestId}`;
// const getUserRoomKey = (userId) => `USER-${userId}`;


export class WebSocketController {
  io;

  constructor(socketServer) {
    this.io = socketServer;
  }

  connectSocket = (socket) => {
    const { board } = socket.handshake.query;
    if (!board) {
      getLogger().error('Failed to connect socket, handshake missing user or org uuid');
      return;
    }
    // socket.join(getUserRoomKey(user));
    socket.join(getBoardRoomKey(board));
    socket.board = board;
  };

  disconnectSocket = (socket) => {
    const { board } = socket;
    if (!board) {
      getLogger().error('Failed to disconnect socket, active socket is invalid');
      return;
    }
    socket.leave(getBoardRoomKey(board));
    // socket.leave(getOrgRoomKey(org));
  };

  disconnectUser = (user) => {
    this.io.in(getUserRoomKey(user)).disconnectSockets(true);
  };

  emitToBoard = (boardId, event, ...args) => this.io.to(getBoardRoomKey(boardId)).emit(event, ...args);

  // emitToOrg = (org, event, ...args) => this.io.to(getBoardRoomKey(org)).emit(event, ...args);
}
