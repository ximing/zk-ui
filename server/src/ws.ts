const zookeeper = require('node-zookeeper-client');

const { CreateMode } = zookeeper;

export default function(server) {
    // eslint-disable-next-line import/no-unresolved
    const io = require('socket.io')(server, {
        path: '/zk/wss',
        pingTimeout: 10000,
        pingInterval: 5000,
    });
    io.on('connection', function(socket) {
        const disconnect = function() {
            if (socket) {
                socket.disconnect(true);
            }
        };
        const sendErrorMsg = function(name, msg) {
            if (socket) {
                socket.emit(name, {
                    error: {
                        msg,
                    },
                });
            }
        };
        try {
            const socketId = socket.id;
            console.log('doc conection', socketId);
            let timer = null,
                client;
            socket.on('disconnect', function() {
                console.log('disconnect');
                if (timer) {
                    clearTimeout(timer);
                }
                if (client) {
                    client.close();
                }
            });
            socket.on('zk-connect', msg => {
                console.log('zk-connect', msg);
                client = zookeeper.createClient(msg.url, { sessionTimeout: 100 });
                client.once('connected', error => {
                    if (error) {
                        console.log(error.stack);
                        sendErrorMsg('zk-connect', error.message);
                        return;
                    }
                    console.log('Connected to the zookeeper server.');
                    socket.emit('zk-connect', { data: {} });
                });
                client.connect();
                // client.create(
                //     `/test/${socket.id}`,
                //     Buffer.from(socket.id),
                //     zookeeper.CreateMode.PERSISTENT,
                //     (error, path) => {
                //         if (error) {
                //             console.log(error.stack);
                //             return;
                //         }
                //         console.log('Node: %s is created.', path);
                //     },
                // );
            });
            socket.on('command', ({ name, path }) => {
                console.log('command', name, path);
                if (!name) {
                    sendErrorMsg(name, 'name is null');
                }
                if (!path) {
                    sendErrorMsg(name, 'path is null');
                }
                if (client) {
                    client[name](path, function(error, data) {
                        if (error) {
                            console.log(error.stack);
                            sendErrorMsg(name, error.message);
                            return;
                        }
                        console.log('name', data);
                        if (socket) {
                            socket.emit(name, { data, path });
                        }
                    });
                } else {
                    sendErrorMsg(name, 'client is null');
                }
            });
            // socket.on("auth", function(data) {
            //     if (data.uid) {
            //         socket.join(`wd-rome-${data.uid}`);
            //         socket.emit("authenticated");
            //     } else {
            //         console.log("没有收到用户信息", JSON.stringify(data));
            //         socket.emit("un-authenticated");
            //         timer = setTimeout(() => {
            //             disconnect();
            //         }, 2000);
            //     }
            // });
        } catch (err) {
            console.log(err);
        }
    });
}
