let server = require('ws').Server;
let s = new server({port: 5002});

s.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('Received '+message);
        //console.log(s.clients);
        s.clients.forEach(function (client) {
            if(client !== ws) {
                setTimeout(function timeout() {
                    console.log("mensajes enviados a cada cliente");
                    client.send(message);   
                }, 500);    
                console.log("sequeda aqui");
             }
        });
    });
    ws.on('close', function() {
        console.log("I lost client");
    })
});