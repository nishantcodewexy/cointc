const path = require("path");

module.exports = {
  register(HapiServer, options) {
    /**************************************
     * Serve static react app
     **************************************/
    const urlPaths = [
      "",
      "/admin",
      "/admin/admin-bank-details",
      "/admin/user-management",
      "/admin/user-information",
      "/admin/user-secession",
      "/admin/user-session-history",
      "/admin/user-balance",
      "/admin/user-referral-management",
      "/admin/user-kyc-management",
      "/admin/wallet-deposits",
      "/admin/wallet-withdrawals",
      "/admin/wallet-withdrawals-application-management",
      "/admin/wallet-withdrawals-fee-management",
      "/admin/auth-security-management",
      "/admin/auth-kyc-certification",
      "/admin/currency-management",
      "/admin/adverts",
      "/admin/orders",
      "/admin/p2p-trade-history",
      "/admin/p2p-disputes",
      "/admin/chat-messenger",
      "/admin/chat-history",
      "/admin/support",
      "/admin/support-disputes",
      "/admin/login",
      "/trade",
      "/wallet",
      "/orders",
      "/affiliate",
      "/support",
      "/ad_payment_method",
      "/ad_create",
      "/ad_contract",
      "/my-page",
      "/login",
      "/signup",
      "/wallet_th"
    ];

    urlPaths.forEach((url) => {
      HapiServer.route({
        method: "GET",
        path: `${url}/{params*}`,
        handler: {
          directory: {
            path: ".",
            redirectToSlash: true,
            lookupCompressed: true,
          },
        },
      });
    });
  },
  name: "app",
  once: true,
};
