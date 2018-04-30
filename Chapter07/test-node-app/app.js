const http = require('http');
const constants = require('./constants');
const template = require('./index.html');
const port = constants.port;
const handlebar = require('handlebars');
//console.log("template",);
http.createServer((req, res) => {

	if(req.url == '/html'){
		res.setHeader('content-type', 'text/html');
		const templateData = handlebar.compile(template)({
			"audience" : "Readers",
			"adjective": "simple"
		})
		res.end(templateData);
	}else
    	res.end(`Hello ${constants.audience}`);
}).listen(port);
console.log(`Node Server is running on port : ${port}`)
