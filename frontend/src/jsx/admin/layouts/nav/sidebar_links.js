let links = [
  {
    name: "dashboard",
    icon: "flaticon-144-layout",
    path: ".",
  },
  // Admin bank details
  {
    name: "admin-bank-details",
    icon: "flaticon-144-layout",
    path: "admin-bank-details",
  },
  // user management
  {
    name: "user-management",
    icon: "flaticon-144-layout",
    path: "user-management",
    embedded: [
      {
        name: "user-information",
        path: "user-information",
      },
      {
        name: "secession-management",
        path: "user-secession-management",
      },
      {
        name: "login-history",
        path: "user-login-history",
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
    icon: "flaticon-003-diamond",
    path: "admin-wallet-management",
    embedded: [
      {
        name: "deposit-management",
        path: "wallet-deposit-management",
      },
      {
        name: "withdrawal-management",
        path: "wallet-withdrawal-management",
      },
    ],
  },
  // Authentication management
  {
    name: "authentication",
    icon: "flaticon-381-settings-2",
    path: "authentication-management",
    embedded: [
      {
        name: "security-management",
        path: "authentication-security-management",
      },
      {
        name: "kyc-certification",
        path: "authentication-kyc-certification",
      },
    ],
  },
  
  // Advert management
  {
    name: "advert-management",
    icon: "flaticon-077-menu-1",
    path: "advert-management",
  },
  // P2P management
  {
    name: "P2P-management",
    icon: "flaticon-061-puzzle",
    path: "p2p-management",
  },
  // chat
  {
    name: "chat-management",
    icon: "flaticon-144-layout",
    path: "chat-management",
  },
  // support
  {
    name: "support-management",
    icon: "flaticon-144-layout",
    path: "support",
    embedded: [
      {
        name: "Support",
        path: "support",
      },
      {
        name: "customer-care",
        path: "support-customer-care",
      }
    ]
  },
];

export default links;