"use strict"
const {country} = require("./countries.json")
const currencies = require("./currencies.json")

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
    }
  }
};
