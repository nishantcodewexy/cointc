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
    HapiServer.route({
      method: "GET",
      path: "/trade/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/orders/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/wallet/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/affiliate/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/support/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/ad_create/{params*}",
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
        }, 
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/ad_payment_method/{params*}",
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
        },
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/ad_contract/{params*}",
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
        },
      },
    });
    HapiServer.route({
      method: "GET",
      path: "/my-page/{params*}",
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
        },
      },
    });
  },
  name: "app",
  once: true,
};
