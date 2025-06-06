const { SocketAddress } = require('net')

const io = require('socket.io')(process.env.PORT || 3000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('send-chat-message', message => {
        if (typeof message === 'string' && message.trim() !== '') {
            socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
        }
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});