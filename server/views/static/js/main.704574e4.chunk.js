(this.webpackJsonpcointc=this.webpackJsonpcointc||[]).push([[2],{19:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var i={LOGIN:"login",REGISTER:"register",CREATE:"create",RETRIEVE:"retrieve",UPDATE:"update",DROP:"drop",FIND:"find",BULK_RETRIEVE:"bulk.retrieve",BULK_CREATE:"bulk.create",BULK_UPDATE:"bulk.update",BULK_DROP:"bulk.drop",ADVERT_FIND:"advert.find",BULK_ORDER:"bulk.find"},r=i,o={REQUEST:{CLEAR:"CLEAR_REQUEST",SESSION_LOGIN:"USER_LOGIN_REQUEST",SESSION_LOGOUT:"USER_LOGOUT_REQUEST",USER_REGISTER:"USER_REGISTER_REQUEST",USER_PROFILE:"USER_PROFILE_REQUEST",USER_DROP:"USER_DELETE_REQUEST"},SESSION:{LOGIN:"SESSION_LOGIN",LOGOUT:"SESSION_LOGOUT",REGISTER:"SESSION_REGISTER",RESET:"SESSION_REGISTER_RESET"},SERVICE:i,NOTICE:{ERROR:"ERROR_NOTICE",WARN:"WARN_NOTICE",INFO:"INFO_NOTICE",SUCCESS:"SUCCESS_NOTICE",CLEAR:"CLEAR_NOTICE"}};t.b=o},27:function(e,t,a){"use strict";var i=a(42),r=Object(i.a)(),o=a(38),l=a(15),n=a(43),c=a.n(n),s=a(44),d=a(8),u=a(10),b=a(19),h=b.b.SESSION,v={user:null};var O=b.b.REQUEST,p={type:null,with:null},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O.SESSION_LOGIN:case O.SESSION_LOGOUT:case O.USER_REGISTER:case O.USER_PROFILE:case O.USER_DROP:return{with:t.data||null,type:t.type};case O.CLEAR:return p;default:return e}};var y=b.b.NOTICE,j={message:null,type:null};var S=Object(d.b)({session:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h.REGISTER:case h.LOGIN:return Object(u.a)(Object(u.a)({},e),{},{user:t.data});case h.LOGOUT:return v;default:return e}},request:g,notice:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y.ERROR:return Object(u.a)(Object(u.a)({},e),{},{message:t.data,type:"danger"});case y.WARN:return Object(u.a)(Object(u.a)({},e),{},{message:t.data,type:"warning"});case y.INFO:return Object(u.a)(Object(u.a)({},e),{},{message:t.data,type:"info"});case y.SUCCESS:return Object(u.a)(Object(u.a)({},e),{},{message:t.data,type:"success"});case y.CLEAR:return j;default:return e}}}),E=S,f=Object(s.createLogger)(),_={key:"root",storage:c.a,whitelist:["session","settings"]},x=Object(l.g)(_,E),R=Object(o.a)({reducer:x,middleware:function(e){return e({serializableCheck:{ignoredActions:[l.a,l.f,l.b,l.c,l.d,l.e]}}).concat(f)}});var m={history:r,store:{store:R,persistor:Object(l.h)(R)},headers:function(e){return{Authorization:e?"Bearer ".concat(e):""}}};t.a=m},35:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var i=a(6),r=a(0),o="ltr",l=[{typography:"poppins",version:"light",layout:"vertical",headerBg:"color_1",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"full",direction:o},{typography:"poppins",version:"light",layout:"vertical",primary:"color_5",headerBg:"color_1",navheaderBg:"color_5",sidebarBg:"color_5",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:o},{typography:"poppins",version:"light",layout:"vertical",primary:"color_7",headerBg:"color_1",navheaderBg:"color_7",sidebarBg:"color_1",sidebarStyle:"modern",sidebarPosition:"static",headerPosition:"fixed",containerLayout:"wide",direction:o},{typography:"poppins",version:"light",layout:"vertical",primary:"color_15",headerBg:"color_1",navheaderBg:"color_13",sidebarBg:"color_13",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:o},{typography:"poppins",version:"light",layout:"vertical",primary:"color_9",headerBg:"color_9",navheaderBg:"color_9",sidebarBg:"color_1",sidebarStyle:"compact",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:o},{typography:"poppins",version:"light",layout:"vertical",primary:"color_1",headerBg:"color_1",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:o},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_3",headerBg:"color_1",sidebarStyle:"mini",sidebarBg:"color_1",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_1",direction:o},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_2",headerBg:"color_1",sidebarStyle:"mini",sidebarBg:"color_2",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_2",direction:o},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_14",headerBg:"color_14",sidebarStyle:"full",sidebarBg:"color_2",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_2",direction:o}],n=a(3),c=Object(r.createContext)();t.b=function(e){var t=Object(r.useState)({value:"full",label:"Full"}),a=Object(i.a)(t,2),o=a[0],s=a[1],d=Object(r.useState)({value:"fixed",label:"Fixed"}),u=Object(i.a)(d,2),b=u[0],h=u[1],v=Object(r.useState)({value:"fixed",label:"Fixed"}),O=Object(i.a)(v,2),p=O[0],g=O[1],y=Object(r.useState)({value:"vertical",label:"Vertical"}),j=Object(i.a)(y,2),S=j[0],E=j[1],f=Object(r.useState)({value:"ltr",label:"LTR"}),_=Object(i.a)(f,2),x=_[0],R=_[1],m=Object(r.useState)("color_1"),L=Object(i.a)(m,2),w=(L[0],L[1]),B=Object(r.useState)("color_1"),T=Object(i.a)(B,2),A=T[0],I=T[1],N=Object(r.useState)("color_1"),P=Object(i.a)(N,2),C=P[0],U=P[1],F=Object(r.useState)("color_1"),k=Object(i.a)(F,2),G=k[0],D=k[1],H=Object(r.useState)(!1),z=Object(i.a)(H,2),W=z[0],Q=z[1],V=Object(r.useState)(!1),K=Object(i.a)(V,2),M=K[0],q=K[1],J=Object(r.useState)({value:"dark",label:"Dark"}),Y=Object(i.a)(J,2),X=Y[0],Z=Y[1],$=Object(r.useState)({value:"wide-boxed",label:"Wide Boxed"}),ee=Object(i.a)($,2),te=ee[0],ae=ee[1],ie=document.querySelector("body"),re=Object(r.useState)(0),oe=Object(i.a)(re,2),le=(oe[0],oe[1]),ne=Object(r.useState)(0),ce=Object(i.a)(ne,2),se=(ce[0],ce[1]),de=function(){le(window.innerWidth),se(window.innerHeight),window.innerWidth>=768&&window.innerWidth<1024?ie.setAttribute("data-sidebar-style","mini"):window.innerWidth<=768?ie.setAttribute("data-sidebar-style","overlay"):ie.setAttribute("data-sidebar-style","full")},ue=function(e){w(e),ie.setAttribute("data-primary",e)},be=function(e){I(e),ie.setAttribute("data-nav-headerbg",e)},he=function(e){U(e),ie.setAttribute("data-headerbg",e)},ve=function(e){D(e),ie.setAttribute("data-sibebarbg",e)},Oe=function(e){h(e),ie.setAttribute("data-sidebar-position",e.value)},pe=function(e){R(e),ie.setAttribute("direction",e.value);var t=document.querySelector("html");t.setAttribute("dir",e.value),t.className=e.value},ge=function(e){"horizontal"===e.value&&"overlay"===o.value?(E(e),ie.setAttribute("data-layout",e.value),s({value:"full",label:"Full"}),ie.setAttribute("data-sidebar-style","full")):(E(e),ie.setAttribute("data-layout",e.value))},ye=function(e){"horizontal"===S.value&&"overlay"===e.value?alert("Sorry! Overlay is not possible in Horizontal layout."):(s(e),Q("icon-hover"===e.value?"_i-hover":""),ie.setAttribute("data-sidebar-style",e.value))},je=function(e){g(e),ie.setAttribute("data-header-position",e.value)},Se=function(e){ie.setAttribute("data-theme-version",e.value),Z(e)},Ee=function(e){ae(e),ie.setAttribute("data-container",e.value),"boxed"===e.value&&ye({value:"overlay",label:"Overlay"})},fe=function(e,t){var a={},i=l[e];ie.setAttribute("data-typography",i.typography),a.value=i.version,Se(a),a.value=i.layout,ge(a),ue(i.primary),be(i.navheaderBg),he(i.headerBg),a.value=i.sidebarStyle,ye(a),ve(i.sidebarBg),a.value=i.sidebarPosition,Oe(a),a.value=i.headerPosition,je(a),a.value=i.containerLayout,Ee(a),a.value=t,pe(a)};return Object(r.useEffect)((function(){return ie.setAttribute("data-typography","poppins"),ie.setAttribute("data-theme-version","light"),ie.setAttribute("data-layout","vertical"),ie.setAttribute("data-primary","color_1"),ie.setAttribute("data-nav-headerbg","color_1"),ie.setAttribute("data-headerbg","color_1"),ie.setAttribute("data-sidebar-style","overlay"),ie.setAttribute("data-sibebarbg","color_1"),ie.setAttribute("data-primary","color_1"),ie.setAttribute("data-sidebar-position","fixed"),ie.setAttribute("data-header-position","fixed"),ie.setAttribute("data-container","wide"),ie.setAttribute("direction","ltr"),de(),window.addEventListener("resize",de),window.addEventListener("load",(function(){var e=function(e){var t,a,i=window.location.search.substring(1).split("&");for(a=0;a<i.length;a++)if((t=i[a].split("="))[0]===e)return void 0===t[1]||decodeURIComponent(t[1])}("theme");void 0!==e&&fe(e,"ltr")}),!1),function(){return window.removeEventListener("resize",de)}})),Object(n.jsx)(c.Provider,{value:{body:ie,sideBarOption:[{value:"compact",label:"Compact"},{value:"full",label:"Full"},{value:"mini",label:"Mini"},{value:"modern",label:"Modern"},{value:"overlay",label:"Overlay"},{value:"icon-hover",label:"Icon-hover"}],layoutOption:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}],backgroundOption:[{value:"light",label:"Light"},{value:"dark",label:"Dark"}],sidebarposition:b,headerPositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],containerPosition:[{value:"wide-boxed",label:"Wide Boxed"},{value:"boxed",label:"Boxed"},{value:"wide",label:"Wide"}],directionPosition:[{value:"ltr",label:"LTR"},{value:"rtl",label:"RTL"}],fontFamily:[{value:"roboto",label:"Roboto"},{value:"poppins",label:"Poppins"},{value:"opensans",label:"Open Sans"},{value:"HelveticaNeue",label:"HelveticaNeue"}],navigationHader:A,changePrimaryColor:ue,changeNavigationHader:be,changeSideBarStyle:ye,sideBarStyle:o,changeSideBarPostion:Oe,sidebarpositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],changeHeaderPostion:je,headerposition:p,changeSideBarLayout:ge,sidebarLayout:S,changeDirectionLayout:pe,changeContainerPosition:Ee,direction:x,colors:["color_1","color_2","color_3","color_4","color_5","color_6","color_7","color_8","color_9","color_10","color_11","color_12","color_13","color_14","color_15"],haderColor:C,chnageHaderColor:he,chnageSidebarColor:ve,sidebarColor:G,iconHover:W,menuToggle:M,openMenuToggle:function(){"overly"===o.value?q(!0):q(!1)},changeBackground:Se,background:X,containerPosition_:te,setDemoTheme:fe},children:e.children})}},37:function(e,t,a){"use strict";a(0);var i=a(21),r=a(3);t.a=function(){return Object(r.jsx)("div",{className:"authentication  flex flex-column",style:{height:window.screen.height-60},children:Object(r.jsx)("div",{className:"container h-100",children:Object(r.jsx)("div",{className:"row justify-content-center h-100 align-items-center ",children:Object(r.jsx)("div",{className:"col",children:Object(r.jsxs)("div",{className:"form-input-content text-center error-page",children:[Object(r.jsx)("h1",{className:"error-text font-weight-bold",children:"404"}),Object(r.jsxs)("h4",{children:[Object(r.jsx)("i",{className:"fa fa-exclamation-triangle text-warning"})," ","The page you were looking for is not found!"]}),Object(r.jsx)("p",{children:"You may have mistyped the address or the page may have moved."}),Object(r.jsx)("div",{children:Object(r.jsx)(i.b,{className:"btn btn-primary",to:"/",children:"Back to Home"})})]})})})})})}},69:function(e,t,a){"use strict";a.r(t);var i=a(0),r=a.n(i),o=a(16),l=a.n(o),n=a(37),c=a(21),s=a(4),d=a(33),u=a(41),b=a(81),h=a(27),v=(a(51),a(32)),O=a.p+"static/media/light-loader.81da48ab.gif",p=a(3),g=h.a.store,y=g.store,j=g.persistor,S=(h.a.history,{position:"fixed",top:"-50%",left:"-50%",width:"200%",height:"200%"}),E={position:"absolute",top:"0",left:"0",right:0,bottom:0,margin:"auto",width:"100px",height:"100px"},f=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(7)]).then(a.bind(null,641))})),_=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(5),a.e(1),a.e(6)]).then(a.bind(null,635))}));var x=function(){return Object(p.jsx)(c.a,{children:Object(p.jsx)(d.a,{store:y,children:Object(p.jsxs)(u.a,{loading:Object(p.jsx)(b.a,{color:"primary"}),persistor:j,children:[Object(p.jsx)(v.a,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),Object(p.jsxs)(s.d,{children:[Object(p.jsx)(s.b,{path:"/admin",children:Object(p.jsx)(i.Suspense,{fallback:Object(p.jsx)("div",{children:"Loading..."}),children:Object(p.jsx)(f,{})})}),Object(p.jsx)(s.b,{path:"/",children:Object(p.jsx)(i.Suspense,{fallback:Object(p.jsx)("div",{children:Object(p.jsx)("div",{id:"bg",style:S,children:Object(p.jsx)("img",{src:O,alt:"",style:E})})}),children:Object(p.jsx)(_,{})})}),Object(p.jsx)(s.b,{children:Object(p.jsx)(n.a,{})})]})]})})})},R=a(35),m=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(R.b,{children:Object(p.jsx)(x,{})})})},L=function(e){e&&e instanceof Function&&a.e(10).then(a.bind(null,633)).then((function(t){var a=t.getCLS,i=t.getFID,r=t.getFCP,o=t.getLCP,l=t.getTTFB;a(e),i(e),r(e),o(e),l(e)}))},w=a(50);l.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(w.a,{children:Object(p.jsx)(m,{})})}),document.getElementById("root")),L()}},[[69,3,4]]]);
//# sourceMappingURL=main.704574e4.chunk.js.map