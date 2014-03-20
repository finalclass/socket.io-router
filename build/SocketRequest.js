///<reference path="types/types.d.ts"/>
var SocketRequest = (function () {
    function SocketRequest(data, socket) {
        this.data = data;
        this.socket = socket;
    }
    return SocketRequest;
})();

module.exports = SocketRequest;
