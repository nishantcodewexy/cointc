module.exports = {
  apps: [
    {
      name: "cointc_backend",
      script: "yarn backend-dev",
      watch: "./backend",
    },
    {
      name: "cointc_frontend",
      // script: "yarn frontend-dev",
      script: "yarn client-build && serve -s ./client/build",
      watch: "./frontend",
    },
  ],
};
