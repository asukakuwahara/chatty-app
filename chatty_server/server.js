// server.js

const express = require('express');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  wss.clients.forEach(function each(client) {
    const userCount = {
      type: 'userCount',
      number: wss.clients.size,
    }
    client.send(JSON.stringify(userCount))
  })
  // console.log(wss.clients.size)

  ws.on('message', (message) =>{
    const msg = JSON.parse(message)
    wss.clients.forEach(function each(client) {
        if (client.readyState == WebSocket.OPEN) {
            switch(msg.type) {
                case 'postMessage':
                    msg.type = 'incomingMessage'
                    break;
                case 'postNotification':
                    msg.type = 'incomingNotification'
                    break;
                default: 
                  // show an error in the console if the message type is unknown
                  throw new Error('Unknown event type ' + msg.type);
            }
        client.send(JSON.stringify(msg));
    }
    })
    console.log(wss.clients.size)
    });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => 
  wss.clients.forEach(function each(client) {
    const userCount = {
      type: 'userCount',
      number: wss.clients.size,
    }
    client.send(JSON.stringify(userCount))
  })

  );
});