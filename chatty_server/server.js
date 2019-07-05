// server.js
const uuidv4 = require('uuid/v4');
const express = require('express');
const WebSocket = require('ws');
const randomColor = require('randomcolor');

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
  sendUserCount()
  const userColor = {
    type: 'userColor',
    color: randomColor(),
  }
  ws.send(JSON.stringify(userColor))

  ws.on('message', (message) =>{
    const msg = JSON.parse(message)
            switch(msg.type) {
                case 'postMessage':
                    msg.id = uuidv4();
                    msg.type = 'incomingMessage';
                    break;
                case 'postNotification':
                    msg.id = uuidv4(),
                    msg.type = 'incomingNotification'
                    break;
                case 'incomingMessage':
                    console.log('wrong incoming Message'+ msg.id)
                    break;
                case 'incomingNotification':
                    console.log('wrong incoming notification' + msg)
                    break;

                default: 
                  // show an error in the console if the message type is unknown
                  throw new Error('Unknown event type on server ' + msg.type);
            }
    wss.clients.forEach(function each(client) {
      if (client.readyState == WebSocket.OPEN) {
          client.send(JSON.stringify(msg));
        }
      })
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => 
  // delete idToName[userId],
  sendUserCount()
  );
});

//send number of users to app
const sendUserCount = () =>{
  wss.clients.forEach(function each(client) {
    const userCount = {
      type: 'userCount',
      number: wss.clients.size
    }
    client.send(JSON.stringify(userCount))
  })
}
