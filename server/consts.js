"use strict"
const {country} = require("./countries.json")
const currencies = require("./currencies.json")
const mimetypes = require("./mimetypes.json")

module.exports = {
  patterns: {
    password: new RegExp("^[a-zA-Z0-9_@$#!~]{6,30}$"),
    ads_kind: new RegExp("^(buy|sell)$", 'i')
  },
  /**
     * @enum {String}
     */
  roles: {
    admin: 'admin',
    basic: 'basic'
  },
  types:{
    /**
     * @enum {String}
     */
    banks:{
      USBANK:"USBANK"
    },
    /**
     * @enum {String}
     */
    country,
    currencies,
    TicketSubjectType:{
      HIGH:"HIGH",
      LOW:"LOW",
    },
    /**
     * @enum {String}
     */
    TicketStatusType:{
      OPEN:"OPEN",
      CLOSE:"CLOSE",
    },
    /**
     * @enum {String}
     */
    MimeType:mimetypes,
    KycStatusType:{
      PENDING:"PENDING",
      ACCEPT:"ACCEPT",
      DENY:"DENY"
    },
    /**
     * @enum {String}
     */
    ProfileModeType:{
      standard:"standard"
    },
    /**
     * @enum {String}
     */
    LogType:{
      AUTH_HISTORY:"AUTH_HISTORY",
      TRADE_HISTORY:"TRADE_HISTORY",
      CHAT_HISTORY:"CHAT_HISTORY",
      SMS_HISTORY:"SMS_HISTORY",
      DEPOSIT_AND_WITHDRAW:"DEPOSIT_AND_WITHDRAW",
    },
    /**
     * @enum {String}
     */
    LoginStatusType:{
      LOGGED_IN:"LOGGED_IN",
      FAILED:"FAILED",
      LOGGED_OUT:"LOGGED_OUT",
      
    },
    /**
     * @enum {String}
     */
    HistoryPostType:{
      BUY:"BUY",
      SELL:"SELL"
      
    },
    /**
     * @enum {String}
     */
    AdvertType:{
      maker:"maker",
      taker:"taker"
    },
    /**
     * @enum {String}
     */
    AssetType:{
      BTC:"BTC",
      ETH:"ETH",
      BNB:"BNB",
      XRP:"XRP",
      USDT:"USDT",
    }
  },
  FILE_UPLOAD_PATH:process.env.MEDIA_FILE_DIR||'mediafiles'
};
