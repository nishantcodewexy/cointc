import Home from "./pages";
import Setting from "./pages/setting";
import UserInfo from "./pages/user_information";
import UserMgmt from "./pages/user_management";
import AdminBankDetailsTable from './pages/admin_bank_details'
import UserSecession from './pages/user_secession'
import UserSessionHistory from './pages/user_session_history'
import UserBalance from './pages/user_balance';
import UserReferralMgmt from './pages/user_referrals';
import CustomerSupport from './pages/support';
import CurrencyMgmt from './pages/currency_management';
import UserKYCMgmt from './pages/user_kyc_management';
import Withdrawals from './pages/withdrawals';
import Deposits from './pages/deposits';
import AdvertsMgmt from './pages/advert_management';
import OrdersMgmt from './pages/order_management';
import P2PTradeHistory from './pages/p2p_trade_history';
import P2PDisputes from './pages/p2p_disputes';
import ChatHistory from './pages/chat_history';
import ChatMessenger from './pages/chat_messenger';
import AuthSecurityMgmt from './pages/auth_security';
import AuthKYCCertification from './pages/auth_kyc_certification';
import { toQueryString } from "../../_helpers/navigations.helper";
import { camelCase } from "../../_helpers/utils.helper";





const routes =  [
  { url: "", create:(obj)=>''+toQueryString(obj), component: Home },
  { url: "setting",create:(obj)=>'setting'+toQueryString(obj), component: Setting },
  { url: "admin-bank-details",create:(obj)=>'/admin-bank-details/'+toQueryString(obj), component: AdminBankDetailsTable },

  // User management
  { url: "user-balance",create:(obj)=>'/user-balance/'+toQueryString(obj), component: UserBalance },
  { url: "user-management",create:(obj)=>'/user-management/'+toQueryString(obj), component: UserMgmt },
  { url: "user-information",create:(obj)=>'/user-information/'+toQueryString(obj), component: UserInfo },
  { url: "user-secession",create:(obj)=>'/admin-bank-details/'+toQueryString(obj), component: UserSecession },
  { url: "user-session-history", component: UserSessionHistory },
  { url: "user-kyc-management", component: UserKYCMgmt },
  { url: "user-referral-management", component: UserReferralMgmt },

  // Currency Management 
  { url: "currency-management", component: CurrencyMgmt, },
  
  // Wallet Management 
  { url: "wallet-withdrawals", component: Withdrawals, },
  { url: "wallet-deposits", component: Deposits, },
  { url: "wallet-withdrawal-application-management", component: null },
  { url: "wallet-withdrawal-fee-management", component: null },

  // Adverts 
  { url: "adverts", component: AdvertsMgmt, },
  { url: "orders", component: OrdersMgmt, },

  // P2P Trade 
  { url: "p2p-trade-history", component: P2PTradeHistory, },
  { url: "p2p-disputes", component: P2PDisputes, },

  // Chat management 
  { url: "chat-history", component: ChatHistory, },
  { url: "chat-messenger", component: ChatMessenger, },

  // Support 
  { url: "auth-security-management", component: AuthSecurityMgmt, },
  { url: "auth-kyc-certification", component: AuthKYCCertification, },

  // Support 
  { url: "support", component: CustomerSupport, },
  { url: "support-disputes", component: null, },


];

export const genAdminRoute = () =>{
  const linkCreator = {}
  const exclude = ["*"]
  routes.forEach(route=>{
    if(exclude.includes(route.url)) return
    let key = camelCase(route.url.replace("-"," "))
    if (route.create){
      linkCreator[key] = route?.create
    }else{
      linkCreator[key] = (obj) => route.url+toQueryString(obj)

    }
  })

  return linkCreator
    

}


export default routes;
