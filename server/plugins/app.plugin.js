const glob = require("glob");
const path = require("path");

module.exports = {
  register(HapiServer, options) {
    /**************************************
     * Serve static react app
     **************************************/
     HapiServer.route({
      method: "GET",
      path: "/{param*}",
      handler: {
        directory: {
          path: '.',
          // listing: true,
          redirectToSlash: true,
          lookupCompressed: true
        },  
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/admin/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          lookupCompressed: true
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/admin/login/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
  },
  name: "app",
  once: true,
};
