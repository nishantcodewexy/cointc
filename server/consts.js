"use strict"
const {country} = require("./countries.json")
const currencies = require("./currencies.json")
const mimetypes = require("./mimetypes.json")

module.exports = {
  patterns: {
    password: new RegExp("^[a-zA-Z0-9_@$#!~]{6,30}$"),
    ads_kind: new RegExp("^(buy|sell)$", 'i')
  },
  roles: {
    admin: 'admin',
    basic: 'basic'
  },
  types:{
    banks:{
      USBANK:"USBANK"
    },
    country,
    currencies,
    TicketSubjectType:{
      HIGH:"HIGH",
      LOW:"LOW",
    },
    TicketStatusType:{
      OPEN:"OPEN",
      CLOSE:"CLOSE",
    },
    MimeType:mimetypes,
    KycStatusType:{
      PENDING:"PENDING",
      ACCEPT:"ACCEPT",
      DENY:"DENY"
    },
    ProfileModeType:{
      standard:"standard"
    },
    access_level: {
      superadmin: 3,
      admin: 2,
      basic: 1
    }
  },
  FILE_UPLOAD_PATH:process.env.MEDIA_FILE_DIR||'mediafiles'
};
