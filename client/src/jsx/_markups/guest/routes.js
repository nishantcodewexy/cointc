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

// import Login from "./pages/login";
import {Login} from "./components/login/Login";
import Error404 from "../../Error404";
import { toQueryString } from "../../_helpers/navigations.helper";
import { camelCase } from "../../_helpers/utils.helper";
import Playground from "./pages/Plaground";


const routes =[
  { url: "", component: Home ,title:'Home' },
  { url: "playground", component: Playground, title:'' },
  { url: "orders" , component:Orders, title:'Orders'},
  { url: "signup" , component:JoinForm ,title:'Sign Up'},
  { url: "wallet" , component:Wallet ,title:'Wallet'},
  { url: "wallet_deposit" , component:Wallet_deposit ,title:'Wallet'},
  { url: "wallet_withdraw" , component:Wallet_withdraw ,title:'Wallet'},
  { url: "wallet_th" , component:Wallet_th ,title:'Wallet'},
  { url: "trade_crypto" , component:Trade_crypto ,title:''},
  { url: "trade" , component:Trade ,title:'P2P Trade'},
  { url: "sell_btc" , component:Sell_btc ,title:''},
  { url: "support" , component:Support ,title:'Support'},
  { url: "affiliate" , component:Affiliate ,title:'Affiliate'},
  { url: "ad_create" , component:Ad_create ,title:'Create Ad'},
  { url: "ad_payment_method" , component:Ad_payment_method ,title:'Create Ad'},
  { url: "ad_contract" , component:Ad_contract ,title:'Create Ad'},
  { url: "my-page" , component:Mypage ,title:'My Page'},
  { url: "my-page-2" , component:Mypage2 ,title:''},
  { url: "verification" , component:Verification, title:'Email Verification'},
  { url: "frame01" , component:Frame01 ,title:''},
  { url: "wallet_verification" , component:Wallet_verification ,title:''},
  { url: "wallet_verification2" , component:Wallet_verification2 ,title:''},
  { url: "login" , component:Login ,title:'Login'},        
  { url: "*", component: Error404, title:'Error'},
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
