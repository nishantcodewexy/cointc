module.exports = (server) => {
  const {
    db,
    db: { User },
    consts: { roles: _roles },
  } = server.app;
  
  return {
    async __destroy(model, where, force, options = {}) {
      return await db[model].destroy({ where, force }, options);
    },

    async __update(model, with_payload, where, options) {
      return await db[model].update(
        { ...with_payload },
        { where },
        { ...options, returning: true }
      );
    },

    __assertRole: function(role) {
      let profile, profile_attributes;
      switch (role) {
        case _roles.admin:
          profile = "admin_profile";
          profile_attributes = [
            "id",
            "kyc",
            "created_at",
            "updated_at",
            "last_login",
            "nickname",
            "archived_at",
          ];
          break;
        case _roles.basic:
          profile = "profile";
          profile_attributes = [
            "id",
            "email",
            "mode",
            "nickname",
            "kyc",
            "referral_code",
            "referrerId",
            "last_login",
            "archived_at",
          ];
          break;
        default:
          console.error(`Unrecognized user role ->`, role);
          throw new Error("User operation not allowed: Bad role");
      }
      let accessors = User.associations[profile]["accessors"];
      let getter = accessors?.get;
      let setter = accessors?.set;
      let creator = accessors?.create;

      let model = User.associations[profile]['target']["name"];
      /* profile
        .split("_")
        .map((_p) => _p.charAt(0).toUpperCase() + _p.slice(1, +_p.length))
        .join(""); */
      return { profile, profile_attributes, model, getter, setter, creator };
    },
  };
};
