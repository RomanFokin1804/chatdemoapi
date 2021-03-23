const sendError = require('./sendError');

module.exports = (ws, data, Chat) => {
  ws.send('', async () => {
    try {
      const { page = 1, limit = 10 } = data;
      const findMessages = await Chat.findAll({ raw: true });
      const count = findMessages.length;
      const totalPages = Math.ceil(count / limit);
      let nextPage = null;
      let previousPage = null;
      if (Number(page) !== totalPages) {
        nextPage = Number(page) + 1;
      }
      if (Number(page) !== 1) {
        previousPage = Number(page) - 1;
      }
      let startList = count - ((page - 1) * limit + Number(limit));
      startList = (startList < 0) ? 0 : startList;
      const endList = count - ((page - 1) * limit);
      const messages = findMessages.slice(startList, endList);
      ws.send(JSON.stringify({
        nextPage,
        previousPage,
        count,
        totalPages,
        messages,
      }));
    } catch (e) {
      sendError(ws, e);
    }
  });
};
