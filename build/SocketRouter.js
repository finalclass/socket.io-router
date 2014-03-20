///<reference path="types/types.d.ts"/>
var SocketRoute = require('./SocketRoute');

var SocketRouter = (function () {
    function SocketRouter(io) {
        this.io = io;
        this.io.sockets.on('connection', this.onConnection.bind(this));
    }
    SocketRouter.prototype.route = function (name, callback) {
        var _this = this;
        var route = new SocketRoute(name, callback);
        this.routes.push(route);
        this.io.sockets.clients().forEach(function (socket) {
            return _this.attachRouteToSocket(route, socket);
        });
    };

    SocketRouter.prototype.onConnection = function (socket) {
        var _this = this;
        this.routes.forEach(function (route) {
            return _this.attachRouteToSocket(route, socket);
        });
    };

    SocketRouter.prototype.attachRouteToSocket = function (route, socket) {
        socket.on(route.name, route.callback);
    };
    return SocketRouter;
})();

module.exports = SocketRouter;
