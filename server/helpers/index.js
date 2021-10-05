"use strict";

const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Jwt = require("@hapi/jwt");
const assert = require("assert");
const { nanoid } = require("nanoid");
const glob = require("glob");
const util = require("util");
const { Op } = require("sequelize");
// const wallets = require("../wallets");
const env = process.env.NODE_ENV || "development";

const {
  PORT,
  HOSTNAME,
  HTTP_PROTOCOL,
  SMTP_USER,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_SECURE,
  // SMTP_AUTH_TYPE,
  // SMTP_ACCESS_TOKEN,
  SECRET_KEY,
  CLIENT_URL,
  // ETHERSCAN_API_KEY,
  // MAINNET_API_KEY,
} = process.env;
/****************************************************
 * Validate the required configuration information
 ****************************************************/
assert(SMTP_USER, "SMTP_USER env configuration is required.");
assert(SMTP_HOST, "SMTP_HOST env configuration is required.");
assert(SECRET_KEY, "SECRET_KEY env configuration is required.");
assert(PORT, "PORT env configuration is required.");
assert(HOSTNAME, "HOSTNAME env configuration is required.");
assert(CLIENT_URL, "CLIENT_URL env configuration is required.");

/****************************************************
 * JWT helpers
 ****************************************************/
const JWTHelpers = () => {
  return {
    config: {
      keys: SECRET_KEY,
      verify: false,
      validate: async (artifacts, request) => {
        const { server } = request;
        const { db } = server.app;
        let {
          decoded: {
            payload: { user },
          },
        } = artifacts;
        user = await db.User.findOne({ where: { id: user } });
        return { isValid: Boolean(user), credentials: { user } };
      },
    },
    verify(decoded, options = {}, secret = SECRET_KEY) {
      try {
        Jwt.token.verify(decoded, secret, options);
        return {
          isValid: true,
          payload: decoded.decoded.payload,
          credentials: decoded,
        };
      } catch (err) {
        return {
          isValid: false,
          error: err.message,
        };
      }
    },
    decodeAndVerify(token, options, secret) {
      let decoded = Jwt.token.decode(token, options);
      return this.verify(decoded, options, secret);
    },

    /***********************************************
     * Gets the JWT token from a Hapi request object
     ***********************************************/
    token: (req) => {
      const {
        auth: { token },
      } = req;
      return token;
    },
    /***********************************************
     * Gets user from decoded JWT token
     ***********************************************/
    decodeUser: (req) => {
      const {
        auth: {
          artifacts: {
            decoded: {
              payload: { user },
            },
          },
        },
      } = req;
      return user;
    },

    create(user, expires = 14400, secret = SECRET_KEY) {
      let scopes = user.role;

      // Sign the JWT
      return Jwt.token.generate(
        {
          user: user.id,
          aud: `urn:audience:${scopes}`,
          iss: `urn:issuer:${scopes}`,
          group: scopes,
        },
        secret,
        {
          ttlSec: expires,
        }
      );
    },
  };
};

/********************************************************
 * Server config
 *******************************************************/
const config = {
  hostname: HOSTNAME,
  port: PORT,
  server_url: `${HTTP_PROTOCOL || "http"}://${HOSTNAME}:${PORT}`,
  client_url: CLIENT_URL,
  secret: SECRET_KEY,
  jwt: JWTHelpers().config,
};
/****************************************************
 * Mailer helpers
 *****************************************************/
const MailerHelpers = () => {
  /********************************************************
   * Generates emailTemplates file content mapping object
   * *****************************************************/
  const templateDir = "templates";
  const emailTemplates = {};
  const cwd = path.join(__dirname, "../");

  let files = glob.sync(`${templateDir}/**/*.ejs`, {
    root: cwd,
  });

  files.forEach((file) => {
    emailTemplates[
      String(path.parse(file).name.toLowerCase())
    ] = fs.readFileSync(path.join(cwd, file), {
      encoding: "utf-8",
    });
  });
  /********************************************************
   * Checks if email template exist
   * *****************************************************/
  function hasEmailTemplate(name) {
    assert(emailTemplates[name], `Email template: ${name} not found!`);
    return emailTemplates[name];
  }

  return {
    /*************************************
     * Maps email templates litrals to specified transform mapping
     *************************************/
    emailTemplateTransformer: (options) => {
      let {
        htmlTemplate,
        subjectTemplate,
        textTemplate,
        html,
        subject,
        text,
        ...rest
      } = options;

      const htmlContent = htmlTemplate && hasEmailTemplate(htmlTemplate.name);
      const textContent = textTemplate && hasEmailTemplate(textTemplate.name);
      const subjectContent =
        subjectTemplate && hasEmailTemplate(subjectTemplate.name);

      subject = subjectContent
        ? ejs.render(subjectContent, subjectTemplate.transform)
        : subject;

      html = htmlContent
        ? ejs.render(htmlContent, htmlTemplate.transform)
        : html;

      text = textContent
        ? ejs.render(textContent, textTemplate.transform)
        : text;

      return {
        ...rest,
        html,
        subject,
        html,
        text,
      };
    },
    /****************************************************
     * Setup mailer
     ****************************************************/
    setupMailer: async () => {
      try {
        let account;

        if (env == "development" && !(SMTP_PASS && SMTP_USER)) {
          // Create Mail test account
          const testMailAccount = await nodemailer.createTestAccount();
          account = {
            user: testMailAccount.user,
            pass: testMailAccount.pass,
          };
        } else {
          account = {
            user: SMTP_USER,
            pass: SMTP_PASS,

            /***************
             *For google email, remove password
             ****************/
            /* type: SMTP_AUTH_TYPE,
            accessToken: SMTP_ACCESS_TOKEN */
          };
        }

        // setup email transport config
        const mailerOptions = {
          host: SMTP_HOST || "smtp.ethereal.email",
          port: SMTP_PORT || "587",
          secure: SMTP_SECURE, // true for 465, false for other ports
          auth: account,
        };

        let transporter = nodemailer.createTransport(mailerOptions, {
          from: "Cryptcon <noreply@cryptcon.com>",
        });

        /**********************************************
         * Generate email templates
         ******************************************/

        const transport = async (options, cb) =>
          transporter.sendMail(emailTemplateTransformer(options), cb);

        return {
          sendMail: transport,
          account,
          templates: emailTemplates,
        };
      } catch (err) {
        console.debug(`MailError: ${err}`);
        debugger;
      }
    },
  };
};

module.exports = {
  config,
  jwt: JWTHelpers(),
  mailer: MailerHelpers(),
  // wallets: wallets,
  /****************************************************
   * Generates private/public key pair
   ****************************************************/
  async generateKeyPair(passphrase, cb) {
    const { generateKeyPair } = require("crypto");

    return util.promisify(() =>
      generateKeyPair(
        "rsa",
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase,
          },
        },
        cb
      )
    );
  },

  /****************************************************
   * Generated referral code
   ****************************************************/
  /*  generateReferralCode(email) {
    let username = email.split("@")[0];
    let uuid = "";

    for (let i = 0; i < 4; ++i) {
      uuid += username[Math.floor(Math.random() * username.length)];
    }
    return uuid + nanoid(4);
  },
 */
  /****************************************************
   * Text encryption
   ****************************************************/
  encrypt: async (text) => {
    try {
      assert(text, "text is required");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(text, salt);
      return hash;
    } catch (err) {
      console.error(err);
    }
  },
  /***********************************************
   * Checks if hash is text
   ***********************************************/
  decrypt: async (text, hash) => {
    try {
      assert(text, "text is required");
      assert(hash, "hash is required");
      return await bcrypt.compare(text, hash);
    } catch (err) {
      console.error(err);
    }
  },

  /***********************************************
   * Generate text that can be used as OTP
   ***********************************************/
  /* generateOTP: function (max = 4) {
    var digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < max; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }, */

  generator: {
    referralCode(email) {
      let username = email.split("@")[0];
      let uuid = "";

      for (let i = 0; i < 4; ++i) {
        uuid += username[Math.floor(Math.random() * username.length)];
      }
      return uuid + nanoid(4);
    },
    otp(max = 4) {
      var digits = "0123456789";
      let otp = "";

      for (let i = 0; i < max; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      return otp;
    },
    secret(len = 8) {
      var chars =
        "ABCDEFGHIJKLMNOPGRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@$#!~";
      let secret = "";
      for (let i = 0; i < len; i++) {
        secret += chars[Math.floor(Math.random() * 10)];
      }
      return secret;
    },
  },
  // objectToHex(obj) {
  //   return Buffer.from(JSON.stringify(obj)).toString("hex");
  // },

  // hexToObject(hex) {
  //   return JSON.parse(Buffer.from(hex, "hex"));
  // },

 /*  sluggify: (text) => {
    return text.toLowerCase();
  }, */
  /***********************************************
   * function helps to convert params to sequlize where clauses
   ***********************************************/
  /**
   *
   * @param {Object} args
   * @param {Object} args.params
   * @param {Object} args.config
   * @returns {Object}
   */
  filter: ({ params, allowed_params, search_fields, options }) => {
    //   set defaults
    if (!allowed_params) allowed_params = [];
    if (!search_fields) search_fields = [];
    if (!params) throw new Error("params is required");
    //   options for additional configurations
    if (!options) {
      options = {};
    }
    const defaultOption = {
      maxLimit: 30,
    };

    const { maxLimit } = { ...defaultOption, ...options };

    const { q, _limit, _offset, _page, _order, ...extra } = params;

    let config = {
      where: {},
      offset: 0,
      limit: 20,
      order: ["created_at", "DESC"],
    };

    if (_limit) {
      config.limit = parseInt(_limit);
      if (config.limit > maxLimit) {
        config.limit = maxLimit;
      }
    }

    if (_offset) {
      config.offset = parseInt(_offset);
    }

    if (_page) {
      config.offset = _limit
        ? parseInt(_page) * parseInt(_limit)
        : parseInt(_page) * 20;
    }

    if (_order) {
      if (typeof _order == "string") {
        config.order = [
          ..._order.replaceAll("-", "").split(","),
          _order.startsWith("-") ? "DESC" : "ASC",
        ];
      } else if (_order.length) {
        config.order = [
          ..._order.map((v) => v.replaceAll("-", "")),
          _order[0].startsWith("-") ? "DESC" : "ASC",
        ];
      }
    }

    if (q) {
      config.where = {
        [Op.or]: search_fields.map((name) => ({
          [name]: {
            [Op.substring]: q,
          },
        })),
      };
    } else {
      // loop throug the remaining query params
      for (const [key, value] of Object.entries(extra)) {
        //   skip loop if key is not allowed
        if (!allowed_params.includes(key)) continue;

        let attribute;
        if (key.endsWith("__ne")) {
          attribute = key.replaceAll("__ne", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.ne]: value,
          };
        } else if (key.endsWith("__gt") && !isNaN(value)) {
          attribute = key.replaceAll("__gt", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.gt]: parseInt(value),
          };
        } else if (key.endsWith("__gte") && !isNaN(value)) {
          console.log("am here");
          attribute = key.replaceAll("__gte", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.gte]: parseInt(value),
          };
        } else if (key.endsWith("__lt") && !isNaN(value)) {
          attribute = key.replaceAll("__lt", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.lt]: parseInt(value),
          };
        } else if (key.endsWith("__lte") && !isNaN(value)) {
          attribute = key.replaceAll("__lte", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.lte]: parseInt(value),
          };
        } else if (key.endsWith("__in")) {
          attribute = key.replaceAll("__in", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.in]: Array.isArray(value)
              ? value.map((v) => (isNaN(v) ? v : parseInt(v)))
              : [isNaN(value) ? value : value],
          };
        } else if (key.endsWith("__nin")) {
          attribute = key.replaceAll("__nin", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.notIn]: Array.isArray(value)
              ? value.map((v) => (isNaN(v) ? v : parseInt(v)))
              : [isNaN(value) ? value : value],
          };
        } else if (key.endsWith("__nlike")) {
          attribute = key.replaceAll("__nlike", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.notLike]: value,
          };
        } else if (key.endsWith("__like")) {
          attribute = key.replaceAll("__like", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.like]: value,
          };
        } else if (key.endsWith("__startswith")) {
          attribute = key.replaceAll("__startswith", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.startsWith]: value,
          };
        } else if (key.endsWith("__endswith")) {
          attribute = key.replaceAll("__endswith", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.endsWith]: value,
          };
        } else if (key.endsWith("__nilike")) {
          attribute = key.replaceAll("__nilike", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.notILike]: value,
          };
        } else if (key.endsWith("__ilike")) {
          attribute = key.replaceAll("__ilike", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.iLike]: value,
          };
        } else if (key.endsWith("__substring")) {
          attribute = key.replaceAll("__substring", "");
          let oldWhere = config.where[attribute] || {};
          config.where[attribute] = {
            ...oldWhere,
            [Op.substring]: value,
          };
        } else if (!key.includes("__")) {
          let oldWhere = config.where[key] || {};
          config.where[key] = {
            ...oldWhere,
            [Op.eq]: value,
          };
        }
      }
    }
    return config;
  },
};
