import Home from "./pages";
import Setting from "./pages/setting.page";
import UserInfo from "./pages/user_information.page";
import UserMgmt from "./pages/user_management.page";
import AdminBankDetailsTable from "./pages/admin_bank_detail.page";
import UserSecession from "./pages/user_secession.page";
import UserSessionHistory from "./pages/user_session_history.page";
import UserBalance from "./pages/user_balance.page";
import UserReferralMgmt from "./pages/user_referrals.page";
import CustomerSupport from "./pages/support.page";
import CurrencyMgmt from "./pages/currency_management.page";
import UserKYCMgmt from "./pages/user_kyc_management.page";
import WalletWithdrawals from "./pages/walllet_withdrawals.page";
import WalletDeposits from "./pages/wallet_deposits.page";
import AdvertsMgmt from "./pages/advert_management.page";
import OrdersMgmt from "./pages/order_management.page";
import P2PTradeHistory from "./pages/p2p_trade_history.page";
import P2PDisputes from "./pages/p2p_disputes.page";
import ChatHistory from "./pages/chat_history.page";
import ChatMessenger from "./pages/chat_messenger.page";
import AuthSecurityMgmt from "./pages/auth_security.page";
import AuthKYCCertification from "./pages/auth_kyc_certification.page";
import { toQueryString } from "../../_helpers/navigations.helper";
import { camelCase } from "../../_helpers/utils.helper";

const routes = [
  { url: "", create: (obj) => "" + toQueryString(obj), component: Home },
  { url: "me", create: (obj) => "" + toQueryString(obj), component: ()=><>Admin profile page</> },
  {
    url: "setting",
    create: (obj) => "setting" + toQueryString(obj),
    component: Setting,
  },
  {
    url: "admin-bank-details",
    create: (obj) => "/admin-bank-details/" + toQueryString(obj),
    component: AdminBankDetailsTable,
  },

  // User management
  {
    url: "user-balance",
    create: (obj) => "/user-balance/" + toQueryString(obj),
    component: UserBalance,
  },
  {
    url: "user-management",
    create: (obj) => "/user-management/" + toQueryString(obj),
    component: UserMgmt,
  },
  {
    url: "user-information",
    create: (obj) => "/user-information/" + toQueryString(obj),
    component: UserInfo,
  },
  {
    url: "user-secession",
    create: (obj) => "/admin-bank-details/" + toQueryString(obj),
    component: UserSecession,
  },
  { url: "user-session-history", component: UserSessionHistory },
  { url: "user-kyc-management", component: UserKYCMgmt },
  { url: "user-referral-management", component: UserReferralMgmt },

  // Currency Management
  { url: "currency-management", component: CurrencyMgmt },

  // Wallet Management
  { url: "wallet-withdrawals", component: WalletWithdrawals },
  { url: "wallet-deposits", component: WalletDeposits },
  { url: "wallet-withdrawal-application-management", component: null },
  { url: "wallet-withdrawal-fee-management", component: null },

  // Adverts
  { url: "adverts", component: AdvertsMgmt },
  { url: "orders", component: OrdersMgmt },

  // P2P Trade
  { url: "p2p-trade-history", component: P2PTradeHistory },
  { url: "p2p-disputes", component: P2PDisputes },

  // Chat management
  { url: "chat-history", component: ChatHistory },
  { url: "chat-messenger", component: ChatMessenger },

  // Support
  { url: "auth-security-management", component: AuthSecurityMgmt },
  { url: "auth-kyc-certification", component: AuthKYCCertification },

  // Support
  { url: "support", component: CustomerSupport },
  { url: "support-disputes", component: null },
];




export const genAdminRoute = () => {
  const linkCreator = {};
  const exclude = ["*"];
  routes.forEach((route) => {
    if (exclude.includes(route.url)) return;
    let key = camelCase(route?.url?.replaceAll("-", " "));
    if(!key){
      key = "home"
    }
    if (route.create) {
      linkCreator[key] = route?.create;
    } else {
      linkCreator[key] = (obj) => route.url + toQueryString(obj);
    }
  });

  return linkCreator;
};

export default routes;
