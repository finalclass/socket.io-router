///<reference path="types/types.d.ts"/>

class SocketRoute {

  constructor(public name:string, public callback:(...arg)=>any) {

  }

}

export = SocketRoute;