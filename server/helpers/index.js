"use strict";
const searchBuilder = require("sequelize-search-builder");
const Sequelize = require("sequelize");

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
const permissions = require("../permissions");

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
  TATUM_API_KEY,
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
  tatum_api_key: TATUM_API_KEY,
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
     * Maps email templates literals to specified transform mapping
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

const generator = {
  referralCode(email) {
    let username = email.split("@")[0];
    let uuid = "";

    for (let i = 0; i < 4; ++i) {
      uuid += username[Math.floor(Math.random() * username.length)];
    }
    return uuid + nanoid(4);
  },
  otp(max = 5) {
    var digits = "0123456789";
    let otp = "";

    for (let i = 0; i < max; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  },
  password(len = 8) {
    var chars =
      "ABCDEFGHIJKLMNOPGRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@$#!~";
    let secret = "";
    for (let i = 0; i < len; i++) {
      secret += chars[Math.floor(Math.random() * chars.length)];
    }
    return secret;
  },
  keypair(passphrase, cb) {
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

  generator,
  permissions,
  // objectToHex(obj) {
  //   return Buffer.from(JSON.stringify(obj)).toString("hex");
  // },

  // hexToObject(hex) {
  //   return JSON.parse(Buffer.from(hex, "hex"));
  // },

  /*  sluggify: (text) => {
    return text.toLowerCase();
  },

  /***********************************************
   * function helps to convert params to sequlize where clauses
   ***********************************************/
  /**
   *
   * @param {Object} args
   * @param {Object} args.query
   * @param {Object} args.extras
   * @param {String[]} args.searchFields
   * @returns {Object}
   */
  filters: async ({ query = {}, searchFields = [], extras = {} }) => {
    const q = query.q || "";
    const searchQuery = {};

    const paranoid = query?.paranoid
      ? Boolean(JSON.parse(query?.paranoid))
      : true;
    q &&
      searchFields.forEach((key) => {
        searchQuery[key] = {
          [Op.iLike]: `%${q}%`,
        };
      });

    let extraWhere = q
      ? {
          [Op.or]: searchQuery,
        }
      : {};

    const search = new searchBuilder(Sequelize, query).setConfig({
        "default-limit": 10,
        logging: true,
      }),
      whereQuery = search.getWhereQuery(),
      orderQuery = search.getOrderQuery(),
      limitQuery = search.getLimitQuery(),
      offsetQuery = search.getOffsetQuery();

    return {
      where: {
        ...whereQuery,
        ...extraWhere,
        ...extras,
      },
      ...(orderQuery ? { order: orderQuery } : {}),
      limit: limitQuery || 10,
      offset: offsetQuery || 0,
      paranoid,
    };
  },
  /**
   *
   * @param {Promise} queryset - return of findAllAndCount
   * @param {Number} limit -
   * @param {Number} offset
   * @returns {Promise}
   */
  paginator: ({ queryset, limit, offset } = { limit: 10, offset: 0 }) => {
    const { rows, count } = queryset;
    let next, prev;

    if (offset) {
      prev = {
        offset: offset - limit,
      };
    } else {
      prev = null;
    }

    if (offset + limit < count) {
      next = {
        offset: offset + limit,
      };
    } else {
      next = { offset: count - offset };
    }

    return {
      count,
      next,
      prev,
      offset,
      limit,
      result: rows,
    };
  },
  validateAndFilterAssociation(list = [], allow = [], Model) {
    if (!Array.isArray(list)) list = [list];
    let valid = [];
    list.forEach((item) => {
      for (let assc in Model.associations) {
        let isSame = assc?.toLowerCase() === item?.toLowerCase();

        if (isSame && allow.includes(assc)) {
          valid.push(assc);
          break;
        }
      }
    });
    return valid?.length ? valid : null;
  },
};

function renameKey(Obj, from = [], to = []) {
  from.forEach((key, idx) => {
    if (key in Obj) {
      let temp = Obj[key];
      delete Obj[key];
      Obj[to[idx]] = temp;
    }
  });
  return Obj;
}
