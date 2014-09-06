///<reference path="typings/tsd.d.ts"/>

import socketIO = require('socket.io');

class SocketRequest {

  constructor(public data:any, public socket:socketIO.Socket) {

  }

}

export = SocketRequest;