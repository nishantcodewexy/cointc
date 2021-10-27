"use strict";
const { country } = require("./countries.json");
const currencies = require("./currencies.json");
const mimetypes = require("./mimetypes.json");

module.exports = {
  patterns: {
    password: new RegExp(/^[a-zA-Z0-9_@$#!~]{6,30}$/),
    ad_type: new RegExp(/^(buy|sell)$/, "i"),
    order_no: new RegExp(/^ORD-\d{12,12}/),
  },
  roles: {
    admin: "admin",
    basic: "basic",
  },
  types: {
    banks: {
      USBANK: "USBANK",
    },
    country,
    currencies,
    TicketSubjectType: {
      HIGH: "HIGH",
      LOW: "LOW",
    },
    TicketStatusType: {
      OPEN: "OPEN",
      CLOSE: "CLOSE",
    },
    MimeType: mimetypes,
    KycStatusType: {
      PENDING: "PENDING",
      ACCEPT: "ACCEPT",
      DENY: "DENY",
    },
    ProfileModeType: {
      standard: "standard",
    },
    access_level: {
      superadmin: 3,
      admin: 2,
      basic: 1,
    },
  },
  FILE_UPLOAD_PATH: process.env.MEDIA_FILE_DIR || "mediafiles",
};
