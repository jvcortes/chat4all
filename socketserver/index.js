let server = require('ws').Server;

// Starts a new WebSocket server.
let s = new server({port: 5002});

// Receives a connection for a user.
s.on('connection', function connection(ws) {
    // Receives a message from the user.
    ws.on('message', function incoming(message) {
        s.clients.forEach(function (client) {
            if(client !== ws) {
                // Sends message to the other user.
                setTimeout(function timeout() {
                    client.send(message);   
                }, 500);    
             }
        });
    });
    ws.on('close', function() {
        console.log("Connection has been lost, trying to reconnect.");
    })
});
