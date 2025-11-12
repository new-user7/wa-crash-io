javascript
const crash = async (conn, target) => {
  for (let i = 0; i < 100; i++) {
    await conn.sendMessage(target, { text: 'Crashing your WhatsApp...' });
  }
  await conn.sendMessage(target, { text: 'Your WhatsApp is now crashed!' });
};

module.exports = crash;
