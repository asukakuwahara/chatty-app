// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;

const server = express()
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));
});

// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: 1000,
//       ignored: /node_modules/
//     }
//   })
//   .listen(3000, '0.0.0.0', function (err, result) {
//     if (err) {
//       console.log(err);
//     }

//     console.log('Running at http://0.0.0.0:3000');
//   });
