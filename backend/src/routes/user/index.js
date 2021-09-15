module.exports = (server) => {
  return {
    method: ["POST", "GET", "PUT"],
    path: "/user/{user?}",
    config: {
      handler(req, h) {
        console.log("In user index route");

        return "In user index route";
      },
    },
  };
};
