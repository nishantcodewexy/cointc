//import Home from "./pages";

import { Home } from './components/home/Home';
import { Orders } from './components/order/Orders';
import { Wallet } from './components/wallet/Wallet';
import { Wallet_deposit } from './components/wallet/Wallet_deposit';
import { Wallet_withdraw } from './components/wallet/Wallet_withdraw';
import { Trade_crypto } from './components/wallet/Trade_crypto';
import { Wallet_verification } from './components/wallet/Wallet_verification';
import { Wallet_verification2 } from './components/wallet/Wallet_verification2';
import { Trade } from './components/trade/Trade';
import { Support } from './components/support/Support';
import { Affiliate } from './components/affiliate/Affiliate';
import { Ad_create } from './components/ad/Ad_create';
import { Ad_payment_method } from './components/ad/Ad_payment_method';
import { Ad_contract } from './components/ad/Ad_contract';
import { Mypage } from './components/my-page/Mypage';
import { Mypage2 } from './components/my-page/Mypage2';
import { Verification } from './components/verification/Verification';
import { Frame01 } from './components/frame/Frame01';
import { Sell_btc } from './components/trade/Sell_btc';
import { Wallet_th } from './components/wallet/Wallet_th';
import { JoinForm } from './components/form/JoinForm';

import Login from "./pages/login";
import Error404 from "../../Error404";
import { toQueryString } from "../../_helpers/navigations.helper";
import { camelCase } from "../../_helpers/utils.helper";
import Playground from "./pages/Plaground";


const routes =[
  { url: "", component: Home },
  { url: "playground", component: Playground },
  { url: "orders" , component:Orders},
  { url: "signup" , component:JoinForm},
  { url: "wallet" , component:Wallet},
  { url: "wallet_deposit" , component:Wallet_deposit},
  { url: "wallet_withdraw" , component:Wallet_withdraw},
  { url: "wallet_th" , component:Wallet_th},
  { url: "trade_crypto" , component:Trade_crypto},
  { url: "trade" , component:Trade},
  { url: "sell_btc" , component:Sell_btc},
  { url: "support" , component:Support},
  { url: "affiliate" , component:Affiliate},
  { url: "ad_create" , component:Ad_create},
  { url: "ad_payment_method" , component:Ad_payment_method},
  { url: "ad_contract" , component:Ad_contract},
  { url: "my-page" , component:Mypage},
  { url: "my-page-2" , component:Mypage2},
  { url: "verification" , component:Verification},
  { url: "frame01" , component:Frame01},
  { url: "wallet_verification" , component:Wallet_verification},
  { url: "wallet_verification2" , component:Wallet_verification2},
        
  // { url: "*", component: Error404,  },
];



export const genRoute = () =>{
  const linkCreator = {}
  const exclude = ["*"]
  routes.forEach(route=>{
    
    let key = camelCase(route.url.replace("-"," "))
    if(exclude.includes(route.url)) return
    if (route.create){
      linkCreator[key] = route?.create
    }else{
      linkCreator[key] = (obj) => route.url+toQueryString(obj)

    }
  })

  return linkCreator
    

}

export default  routes;
