const http = require('http');
const port = 3300;
const studentsData = require('./student_data.json');
http.createServer((req, res) => {
    // res.header('Access-Control-Allow-Origin', 'example.com');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200, { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*"
    });
    res.write(JSON.stringify(studentsData));
    res.end();
}).listen(port);
console.log(`Node Server is running on port : ${port}`)

