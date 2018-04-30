const Hapi        = require('hapi');
const constants   =  require('./constants');
const routes      = require('./routes');
const plugins     = require('./plugins');
const port        = constants.port;
const server      = new Hapi.Server({port});





server.route(routes);
server.register([plugins.logRequest, plugins.mongoConnect])
.then(()=>{
  server.start();
})
.catch((err)=>{
  console.log("error", err);
})

console.log(`Server running at: ${server.info.uri}`);