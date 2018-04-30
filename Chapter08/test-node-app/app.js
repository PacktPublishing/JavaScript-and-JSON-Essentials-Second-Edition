const Hapi        = require('hapi');
const constants   =  require('./constants');
const routes      = require('./routes');
const plugins     = require('./plugins');
const port        = constants.port;
const server      = new Hapi.Server({port});

// //console.log("plugins", plugins);
server.route(routes);
server.register(plugins.logRequest)
.then(()=>{
  server.start();
})
.catch((err)=>{
  console.log("error", err);
})

console.log(`Server running at: ${server.info.uri}`);