"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
const ejs = require("ejs");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const glob = require("glob");
const Jwt = require("@hapi/jwt");
const envConfig = dotenv.parse(fs.readFileSync(".env.local"));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
const {
  PORT,
  HOSTNAME,
  HTTP_PROTOCOL,
  SMTP_USER,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_SECURE,
  SMTP_AUTH_TYPE,
  SMTP_ACCESS_TOKEN,
  SECRET_KEY,
  CLIENT_URL,
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

const env = process.env.NODE_ENVIRONMENT || "development";

/****************************************************
 * JWT config
 ****************************************************/
function verifyJWTToken(token, secret = SECRET_KEY, options = {}) {
  try {
    Jwt.token.verify(token, secret, options);
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: err.message,
    };
  }
}

const jwtConfig = {
  keys: SECRET_KEY,
  verify: false,
  validate: async (artifacts, request, h) => {
    const { server } = request;
    const db = server.app.db;
    const {
      decoded: {
        payload: { user },
      },
    } = artifacts;

    let foundToken = Boolean(await db.User.findOne({ where: { id: user } }));
    return { isValid: foundToken, credentials: {} };
  },
};

/********************************************************
 * Server config
 * *****************************************************/
const serverConfig = {
  hostname: HOSTNAME,
  port: PORT,
  server_url: `${HTTP_PROTOCOL || "http"}://${HOSTNAME}:${PORT}`,
  client_url: CLIENT_URL,
  secret: SECRET_KEY,
  jwt: jwtConfig,
};

/********************************************************
 * Generates emailTemplates file content mapping object
 * *****************************************************/
const templateDir = "templates";
const emailTemplates = {};
const cwd = path.join(__dirname, "../..");

glob
  .sync(`*/${templateDir}/**/*.ejs`, {
    root: cwd,
  })
  .forEach((file) => {
    emailTemplates[String(path.parse(file).name.toLowerCase())] =
      fs.readFileSync(path.join(cwd, file), {
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

/*************************************
 * Maps email templates litrals to specified transform mapping
 *************************************/
const emailTemplateTransformer = (options) => {
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

  html = htmlContent ? ejs.render(htmlContent, htmlTemplate.transform) : html;

  text = textContent ? ejs.render(textContent, textTemplate.transform) : text;

  return {
    ...rest,
    html,
    subject,
    html,
    text,
  };
};

module.exports = {
  serverConfig,
  emailTemplateTransformer,
  createWallet: async (password) => {
    assert(password, "PASSWORD is reuired to create wallet");
    // Connect to the Ethereum network
    const web3 = new Web3(
      Web3.givenProvider ||
        new Web3.providers.HttpProvider("http://localhost:8545")
    );

    // Creates and returns new Ethereum account
    return await web3.eth.personal.newAccount(password);
  },

  /****************************************************
   * Generated referral code
   ****************************************************/
  generateReferralCode(email) {
    let username = email.split("@")[0];
    let uuid = "";

    for (let i = 0; i < 4; ++i) {
      uuid += username[Math.floor(Math.random() * username.length)];
    }
    return uuid + nanoid(4);
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
  generateOTP: function (max = 4) {
    var digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < max; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  },

  // objectToHex(obj) {
  //   return Buffer.from(JSON.stringify(obj)).toString("hex");
  // },

  // hexToObject(hex) {
  //   return JSON.parse(Buffer.from(hex, "hex"));
  // },

  /***********************************************
   * Creates JWT token
   ***********************************************/
  createJWTToken(user, expires = 14400) {
    let scopes = user.role;

    // Sign the JWT
    return Jwt.token.generate(
      {
        user: user.id,
        aud: `urn:audience:${scopes}`,
        iss: `urn:issuer:${scopes}`,
        group: scopes,
      },
      SECRET_KEY,
      {
        ttlSec: expires,
      }
    );
  },
  verifyJWTToken,
  /***********************************************
   * Gets the JWT token from a Hapi request object
   ***********************************************/
  getJWTToken: (req) => {
    const {
      auth: { token },
    } = req;
    return token;
  },
  /***********************************************
   * Gets user from decoded JWT token
   ***********************************************/
  getJWTDecodedUser: (req) => {
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

  sluggify: (text) => {
    return text.toLowerCase();
  },
};
