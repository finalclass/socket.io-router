var SocketRoute = require('./SocketRoute');
var SocketRequest = require('./SocketRequest');

var SocketRouter = (function () {
    function SocketRouter(io) {
        this.io = io;
        this.routes = [];
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

    SocketRouter.prototype.broadcast = function (message, data) {
        this.io.sockets.emit(message, data);
    };

    SocketRouter.prototype.onConnection = function (socket) {
        var _this = this;
        this.routes.forEach(function (route) {
            return _this.attachRouteToSocket(route, socket);
        });
    };

    SocketRouter.prototype.attachRouteToSocket = function (route, socket) {
        socket.on(route.name, function (data) {
            return route.callback.call(null, new SocketRequest(data, socket));
        });
    };
    return SocketRouter;
})();

module.exports = SocketRouter;
