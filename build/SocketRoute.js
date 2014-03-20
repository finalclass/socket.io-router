var SocketRoute = (function () {
    function SocketRoute(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    return SocketRoute;
})();

module.exports = SocketRoute;
