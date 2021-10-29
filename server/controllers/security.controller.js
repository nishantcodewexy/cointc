"use strict";
const dfn = require("date-fns");
// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

module.exports = function SecurityController(server) {
  const {
    db: { User },
  } = server.app;

  return {
    async sendOTP(req, h) {
      const {
        payload: { id },
      } = req;

      try {
        if (!id)
          throw boom.badData("Required payload, <id::uuid> is not provided!");

        let user = await User.findByPk(id);
        if (!user) throw boom.notFound(`Account with id, ${id} not found!`);

        // generate OTP
        let otp = generator.otp();
        let otp_ttl = dfn.addMinutes(new Date(), 14);
        let data = { otp, otp_ttl };
        let security = await user.getSecurity();
        security = security
          ? await security.update(data)
          : await user?.createSecurity(data);
        // await user.setSecurity(data);

        // TODO: Send via email or SMS
        return h
          .response({
            status: true,
            message: "OTP Sent successfully",
            data: {
              phone_number: user?.phone,
              email: user?.email
            },
          })
          .code(200);
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function verifyOTP - Verifies user OTP code
     * @param {Object} req
     * @returns
     */
    async verifyOTP(req) {
      const {
        payload: { id, code },
      } = req;

      try {
        if (!id || !code)
          throw boom.badData(
            "Required payload value, <id::uuid> or <code::string(5)> is not provided!"
          );
        // Find user
        let user = await User.findByPk(id);
        if (!user) throw boom.notFound(`Account with id, ${id} not found!`);

        //  Check that otp exist and is valid
        let security = await user.getSecurity();
        let now = new Date();
        let isValid = dfn.isBefore(now, security?.otp_ttl);

        return security?.otp === code && isValid
          ? login(user)
          : boom.notFound("OTP code is incorrect. Try again!");
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
  };
};
