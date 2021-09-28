import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import Error404 from "./pages/Error404";
import Footer from "./layouts/Footer";

const AdminMarkup = () => {
  return (
    <div>
      <Switch>
        {routes.map((data, i) => (
          <Route
            key={i}
            exact
            path={`/admin/${data.url}`}
            component={data.component}
          />
        ))}
        <Route path="/admin/*" component={Error404} />
      </Switch>

      <div style={{border: "2px dashed white"}}>
        <Footer />
      </div>
    </div>
  );
};
export default AdminMarkup;
