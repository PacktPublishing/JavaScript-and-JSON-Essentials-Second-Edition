const http = require('http');
const port = 3300;
const urlObject = require('url');
const querystring = require('querystring');
let studentsData = require('./student_data.json');
http.createServer((req, res) => {
    let url = req.url;
    const urlParsedObject = urlObject.parse(req.url);
    const pathname = urlParsedObject.pathname;
    const queryObject = querystring.parse(urlParsedObject.query);
    
    
    res.writeHead(200, { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*"
    });

    switch(pathname){
      case '/':
        //No need of commented code in this chapter
        // let student =  studentsData.filter((student)=>{
        //   if(queryObject.zipcode){
        //     return (student.zipcode == queryObject.zipcode);
        //   }
        //   else if(~((student.classes).indexOf(queryObject.class))){
        //     return student;
        //   }
        // })
        // if(student.length==0){
        //   student = studentsData;  
        // }
        //res.write(JSON.stringify(student));
        res.end(JSON.stringify(studentsData));
        break;

      break;
    }
    //console.log("Ending!!");
    
}).listen(port);
console.log(`Node Server is running on port : ${port}`)

