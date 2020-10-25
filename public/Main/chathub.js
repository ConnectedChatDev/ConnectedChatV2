class ChatHub {
    constructor(serverUrl) {
        this._serverUrl = serverUrl;
        var recvFunc = this._receiveMessage.bind(this);
        //this._timer = setInterval(recvFunc, 10000);

        this._socketio = io();

        this._socketio.on('connect', function () {
            console.log('you have been connected');       
          });

        this._socketio.on('connect_error', function () {
            console.log('you have been disconnected');
          });

        this._socketio.on('disconnect', function () {
            console.log('you have been disconnected');
          });
        
        this._socketio.on('reconnect', function () {
            console.log('you have been reconnected');
          });
        
        this._socketio.on('reconnect_error', function () {
            console.log('attempt to reconnect has failed');
          });

        this._socketio.on('chatmessage', recvFunc);
    }

    onMessageReceive(handler) {
        this._handler = handler;
    }

    _receiveMessage(message) {
        if (this._handler) {
            this._handler({
                user: 'socket.io',
                text: message
            });
        }
    }

    sendMessage(message) {
        this._socketio.emit('chatmessage', message);
    }
}