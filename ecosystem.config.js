module.exports = {
  apps: [
    {
      name: "cointc_backend",
      script: "yarn backend-dev",
      watch: "./backend",
    },
    {
      name: "cointc_frontend",
      script: "yarn frontend-dev",
      // script: "yarn frontend-build && serve -s ./frontend/build",
      watch: "./frontend",
    },
  ],
};
