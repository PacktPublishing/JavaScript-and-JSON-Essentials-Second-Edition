//const MongoClient = require('mongodb').MongoClient;
const constants   =  require('./constants');
const MongoClient = require('mongoose');

exports.logRequest = { 
    register(server, options){
        //console.log("A plugin got called!");
        server.ext('onRequest', (request, reply)=>{
            console.log("Listening to request!");
            const path = request.url.path;
            const target = request.url.query.target;
            if(target)
                console.log(`The target is ${target} for url : ${path}`);
            return reply.continue;
        })
    }, 
    name : "logRequest"
}

exports.mongoConnect = {
    register(server, options){
        return MongoClient.connect(constants.mongodb.url)
        .then(function(client){
                console.log("Connected successfully to mongodb server");
                /**
                server.ext('onRequest', (request, reply)=>{
                    request.dbInstance = client.db('test');
                    return reply.continue;
                })**/
                return;
        })
        .catch(function(err){
            console.log("An error occurred while connecting to mongodb!", err)
            return
        })
        
    },
    name : "mongoConnect"
}
/**
 * server.ext('onRequest', (request, reply)=>{
        const path = request.url.path;
        const target = request.url.query.target;
        console.log(`The target is ${target} for url : ${path}`);
        return reply.continue;
      });
 */

 /**
  * //console.log("plugins", plugins.logRequest);
//exports.plugin = { register, name, version, multiple, dependencies, once, pkg }
  */