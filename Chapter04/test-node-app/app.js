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
      //"Access-Control-Allow-Origin" : "*"
    });

    switch(pathname){
      case '/':
        let student =  studentsData.filter((student)=>{
          if(queryObject.zipcode){
            return (student.zipcode == queryObject.zipcode);
          }
          else if(~((student.classes).indexOf(queryObject.class))){
            return student;
          }
        })
        
        if(student.length==0){
          student = studentsData;  
        }
        res.write(JSON.stringify(student));
        res.end();
        break;

        case '/.jsonp':
        //validate query parameter
        const jsonpCallback  = queryObject.jsonp;
        if(!jsonpCallback){
          return res.end(studentsData);
        };
        let start = jsonpCallback + '(', end = ')';
        let stringifiedStudentData = JSON.stringify(studentsData, undefined, 2);
        res.end(start + stringifiedStudentData + end);
        break;
      /**
       * As we dont have any Database, we are just adding
       * to studentsData array.
       */
      case '/addUser':
        let jsonString = '';
        req.on('data', (chunk)=>{
          console.log("chunk", chunk)
          jsonString+= chunk;
        });
        req.on('end', ()=>{
          console.log("parsing", (jsonString));
          let parsedJSON = querystring.parse(jsonString);
          studentsData.push(parsedJSON);
          res.end(JSON.stringify(studentsData));
        });
      break;
    }
    //console.log("Ending!!");
    
}).listen(port);
console.log(`Node Server is running on port : ${port}`)

