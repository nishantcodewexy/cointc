module.exports = {
  apps: [
    {
      name: "cointc_server",
      script: "yarn server-dev",
      watch: "./server",
    },
    {
      name: "cointc_client",
      script: "yarn client-dev",
      // script: "yarn client-build && serve -s ./client/build",
      watch: "./client",
    },
  ],
};
