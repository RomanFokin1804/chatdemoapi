const WebSocket = require('ws');
const Sequelize = require('sequelize');

const addMessageEvent = require('./utils/addMessageEvent');
const getMessageEvent = require('./utils/getMessagesEvent');

const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

const sequelize = new Sequelize('database', 'user', 'password', {
  dialect: 'mysql',
  host: 'host',
});

const Chat = sequelize.define('chat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
sequelize.sync()
  .then()
  .catch((err) => console.log(err));

server.on('connection', (ws) => {
  ws.on('message', (inputMessage) => {
    const { event, data } = JSON.parse(inputMessage);
    switch (event) {
      case 'addMessage':
        addMessageEvent(server, data, Chat, ws);
        break;
      case 'getMessages':
        getMessageEvent(ws, data, Chat);
        break;
      default:
        break;
    }
  });
});
