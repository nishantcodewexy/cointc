let links = [
  {
    name: "dashboard",
    icon: "simple-speedometer",
    path: "",
  },
  // Admin bank details
  {
    name: "admin-bank-details",
    icon: "simple-credit-card",
    path: "admin-bank-details",
  },
  // user management
  {
    name: "user-management",
    icon: "simple-people",
    path: "user-management",
    embedded: [
      {
        name: "user-management",
        path: "user-management",
      },
      {
        name: "user-information",
        path: "user-information",
      },
      {
        name: "secession-management",
        path: "user-secession",
      },
      {
        name: "login-history",
        path: "user-session-history",
      },
      {
        name: "user-balance",
        path: "user-balance",
      },
      {
        name: "referral-management",
        path: "user-referral-management",
      },
      {
        name: "kyc-management",
        path: "user-kyc-management",
      },
    ],
  },
  // Wallet
  {
    name: "wallet-management",
    icon: "simple-wallet",
    path: "admin-wallet-management",
    embedded: [
      {
        name: "deposits",
        path: "wallet-deposits",
      },
      {
        name: "withdrawals",
        path: "wallet-withdrawals",
      },
      {
        name: "withdrawal-application-management",
        path: "wallet-withdrawal-application-management",
      },
      {
        name: "withdrawal-fee-management",
        path: "wallet-withdrawal-fee-management",
      },
    ],
  },
  // Authentication management
  {
    name: "authentication-management",
    icon: "simple-shield",
    path: "authentication-management",
    embedded: [
      {
        name: "security-management",
        path: "auth-security-management",
      },
      {
        name: "kyc-certification",
        path: "auth-kyc-certification",
      },
    ],
  },

  // Currency management
  {
    name: "currency management",
    icon: "themify-glyph-125",
    path: "currency-management",
  },
  // Advert management
  {
    name: "advert management",
    icon: "simple-pin",
    path: "advert-management",
    embedded: [
      { name: "adverts", path: "adverts" },
      { name: "orders", path: "orders" },
    ],
  },
  // P2P management
  {
    name: "trade-management",
    icon: "simple-puzzle",
    path: "p2p-management",
    embedded: [
      {
        name: "trade-history",
        path: "p2p-trade-history",
      },
      {
        name: "disputes",
        path: "p2p-disputes",
      },
    ],
  },
  // chat
  {
    name: "chat-management",
    icon: "simple-bubbles",
    path: "chat-management",
    embedded: [
      {
        name: 'chat-messenger',
        path: 'chat-messenger'
      },
      {
        name: 'chat-history',
        path: 'chat-history'
      }
    ]
  },
  // support
  {
    name: "support-management",
    icon: "simple-support",
    path: "support",
    embedded: [
      {
        name: "Support",
        path: "support",
      },
      {
        name: "disputes-resolutions",
        path: "support-disputes",
      },
    ],
  },
];

export default links;
