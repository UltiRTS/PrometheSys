/* eslint-disable require-jsdoc */

const discordRpc = require('discord-rpc');
const rpcClient = new discordRpc.Client({transport: 'ipc'});

rpcClient.on('ready', () => {
  rpcClient.setActivity({
    details: 'Ultimatum Dev Release',
    // state: "State"
    // startTimestamp: new Date()
    // largeImageKey: "",
    // largeImageText: "",
    // smallImageKey: "",
    // smallImageText: ""
  });

  console.log('Rich presence is now active');
});

rpcClient.login({
  clientId: '806697271407280158',
});

function lobbyPresence() {
  rpcClient.setActivity({
    details: 'Ultimatum- Lobby',
  });
}

function preBtlPresence() {
  rpcClient.setActivity({
    details: 'Ultimatum- Proposing Operation',
  });
}

