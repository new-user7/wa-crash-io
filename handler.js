javascript
const handler = async (conn, message) => {
  const { from, body } = message;
  if (body === '!crash') {
    await conn.sendMessage(from, { text: 'Crashing your WhatsApp...' });
    crash(conn, from);
  }
};

module.exports = handler;
