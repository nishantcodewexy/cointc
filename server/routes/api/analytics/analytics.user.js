"use strict";

module.exports = (server) => {
  // const Schema = require("../../../schema/analytics.schema");
  // const { payload: payloadSchema } = Schema.authenticate(server);

  const {
    controllers: {
      analytics: { userAnalytics },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/analytics/user",
    config: {
      handler: userAnalytics,
      // validate: {
      //   payload: payloadSchema,
      // },
    },
  };
};
