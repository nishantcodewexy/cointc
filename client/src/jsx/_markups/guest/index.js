import { Switch, Route } from "react-router-dom";
import routes from "./routes";


import './app-assets/css/bootstrap.min.css';
import './app-assets/css/animate.css';
import './app-assets/css/common.css';
import './app-assets/css/style.css';
import './app-assets/css/responsive.css';


// import '@fortawesome/fontawesome-free/css/all.min.css';
import { Header } from './components/header/Header';
import { Header2 } from './components/header/Header2';
import { Header3 } from './components/header/Header3';
import { Header4 } from './components/header/Header4';
import { Footer } from './components/footer/Footer';
import { Footer2 } from './components/footer/Footer2';

// import Error404 from "../pages/error404";

function GuestMarkup() {

  const  cur_loc = window.location.pathname;
  var Custom_Header = null;
  var Custom_Footer = null
  if(cur_loc==='/'){
    Custom_Header = <Header2 />;
  }else if(cur_loc==='/affiliate'){
    Custom_Header = <Header3 />;
  }else if(cur_loc==='/my-page' || cur_loc==='/my-page-2'){
    Custom_Header = <Header4 />;
  }else if(cur_loc==='/frame01'){
    Custom_Header = null;
  }else{
    Custom_Header = <Header2 />;
  }

  if(cur_loc === '/'){
    Custom_Footer = <Footer2 />;
  }else if(cur_loc === '/frame01'){
    Custom_Footer = null;
  }else{
    Custom_Footer = <Footer2 />;
  }

  

  return (
    <>
    <div class="wrap">
    {Custom_Header}
    <Switch>
     
     {routes.map((data, i) => (
       <Route
         key={i}
         exact
         path={`/${data.url}`}
         component={data.component}
       />
     ))}
   </Switch>
   {Custom_Footer}
   </div>
   </>
  );
}


export default GuestMarkup;
