///<reference path="types/types.d.ts"/>

import SocketRoute = require('./SocketRoute');
import SocketRequest = require('./SocketRequest');

class SocketRouter {

  private routes:SocketRoute[];

  constructor(public io:SocketManager) {
    this.routes = [];
    this.io.sockets.on('connection', this.onConnection.bind(this));
  }

  public route(name:string, callback:(req:SocketRequest)=>any) : void {
    var route = new SocketRoute(name, callback);
    this.routes.push(route);
    this.io.sockets.clients().forEach((socket:Socket)
      => this.attachRouteToSocket(route, socket));
  }

  public broadcast(message:string, data:any) : void {
    this.io.sockets.emit(message, data);
  }

  private onConnection(socket:Socket) : void {
    this.routes.forEach((route:SocketRoute)
      => this.attachRouteToSocket(route, socket));
  }

  private attachRouteToSocket(route:SocketRoute, socket:Socket) : void {
    socket.on(route.name, (data:any) 
      => route.callback.call(null, new SocketRequest(data, socket)));
  }

}

export = SocketRouter;