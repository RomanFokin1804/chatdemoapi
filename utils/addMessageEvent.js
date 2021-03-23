const WebSocket = require('ws');
const sendError = require('./sendError');

module.exports = (server, data, Chat, ws) => {
  try {
    server.clients.forEach(async (client) => {
      if (client.readyState === WebSocket.OPEN) {
        const sendMessage = await Chat.create({
          message: data.message,
        });
        client.send(JSON.stringify(sendMessage.dataValues));
      }
    });
  } catch (e) {
    sendError(ws, e);
  }
};
