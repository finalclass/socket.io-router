socket.io-router
================

Router to use with socket.io


## Installation

```
npm install socket.io-router
```

## Example usage

**server.js**
```
var http = require('http');
var socketIO = require('socket.io');
var express = require('express');
var sockRouter = require('socket.io-router');
var fs = require('fs');

var app = express();
var server = http.createServer(app);
var io = socketIO.listen(app);
var sRouter = new sockRouter.SocketRouter(io);

sRouter.route('ready', function (req) {
  req.emit('done', {works: true});
  sRouter.broadcast('client_connected');
});

app.get('/', function (req, res) {
  fs.createReadStream('index.html').pipe(res);
});

server.listen();
```

**index.html**
```
<html>
  <head>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io.connect('http://localhost');

      socket.emit('ready');

      socket.on('done', function (data) {
        if (data.works) {
          alert('I\'m connected');
        }
      });

      socket.on('client_connected', function () {
        alert('client connected');
      });
    </script>
  </head>
</html>
```

## API

### class SocketRouter

#### constructor(public io:SocketManager)

#### route(name:string, callback:(req:SocketRequest)=>any) : void;

Define a new route by setting it's name and the callback function.
The callback will be called with SocketRequest instance.

#### broadcast(message:string, data:any) : void;

Broadcast the message to all clients

### class SocketRequest

#### data:any

Data transmitted byt the sender

#### socket:Socket

Socket on which the message was emitted.


## License: ISC

ISC license is even simpler MIT like license. Check out the LICENSE file.