"use strict";

const server = require( "./server" );
const config = require("./config");

const startServer = async () => {
   try {

       // create an instance of the server application
       const app = await server.setup( config );

       // start the web server
       app && await app.start();

       console.log( `Server running at ${config.host_url}` );
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

startServer();
