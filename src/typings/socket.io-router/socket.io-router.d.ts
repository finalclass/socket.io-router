/// <reference path="../socket.io-server/socket.io-server.d.ts"/>

declare module "socket.io-router" {
  import socketIO = require('socket.io');

  class SocketRoute {
    public name:string;
    public callback:(...arg)=>any;
    constructor(name:string, callback:(...arg)=>any);
  }

  export class SocketRequest {
    public data:any;
    public socket:socketIO.Socket;
    constructor(data:any, socket:socketIO.Socket);
  }

  export class SocketRouter {
    public io:socketIO.SocketManager;
    private routes:SocketRoute[];
    constructor(io:socketIO.SocketManager);
    public route(name:string, callback:(req:SocketRequest)=>any) : void;
    public broadcast(message:string, data:any) : void;
    private onConnection(socket:socketIO.Socket) : void;
    private attachRouteToSocket(route:SocketRoute, socket:socketIO.Socket) : void;
  }
}