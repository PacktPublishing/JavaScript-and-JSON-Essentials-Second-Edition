const templateData = require('./index.html');
const server = require('http').createServer((req, res)=>{
	res.setHeader('content-type', 'text/html');
	res.end(templateData);
});
const io = require('socket.io')(server);

let pinBoard = [];

/**
 * kafka implementation
 */
const kafka = require('kafka-node'),
    client = new kafka.Client(),
    consumer = new kafka.Consumer(client,
        [{ topic: 'pinBoard', offset: 0}],
        {
            autoCommit: false
        }
    );

consumer.on('message', function (message) {
    console.log("Sending all the pins..")
    if(typeof message.value=='string'){
    	const pinData = JSON.parse(message.value);
    	pinBoard.push(pinData);
		io.emit('append-to-list', pinData)
    }else
    	throw message.value;
});

consumer.on('error', function (err) {
    console.log('Error:',err);
})


/**
 * Socket.io implementation
 */
io.on('connection', (client)=>{
	console.log("connected to realtime data server");
	io.emit('pin-list', pinBoard)
	client.on('disconnect', ()=>{
		console.log("A user is disconnected!");
	})
	client.on('new-pin', (pinData)=>{
		pinBoard.push(pinData);
		console.log("pinData", pinData);
		io.emit('append-to-list', pinData)
	})
});
server.listen(3400);


