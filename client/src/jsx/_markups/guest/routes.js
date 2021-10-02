import Home from "./pages";
import Login from "./pages/login";
import Error404 from "../Error404";
import { toQueryString } from "../../_helpers/navigations.helper";
import { camelCase } from "../../_helpers/utils.helper";
import Playground from "./pages/Plaground";


const routes =[
  { url: "", component: Home },
  { url: "playground", component: Playground },
  { url: "*", component: Error404,  },
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
