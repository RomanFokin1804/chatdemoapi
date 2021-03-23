module.exports = (ws, e) => {
  ws.send(JSON.stringify({
    error: e,
  }));
};
