import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PageNotFound from "../pages/NotFound";

// React route hook
export function useRoutes(routeConfig) {
  return RouteFromConfig(routeConfig);
}

/**-----------------------------------------------
* @desc Builds routes from config array
* @params {object} routeArray
* @returns
-----------------------------------------------*/
const RouteFromConfig = (routeArray) => {
  return (
    <Router>
    <Switch>
    {routeArray.map((route) => {
      const {
        path,
        label,
        middleware = null,
      } = route;
      route.parent = null;

      return (
        <Route key={label} path={`${path}`}>
        {middleware ? (
          middleware(() => <NestedRouting route={route} />)
        ) : (
          <NestedRouting route={route} />
        )}
        </Route>
      );
    })}
    <Route path="/" exact render={() => <Redirect to="/home" />} />
    <Route component={() => <PageNotFound />} />
    </Switch>
    </Router>
  );
};

/**
* @function NestedRouting - Checks whether to render routes inside layout
* @param {object} props
* @param {object} props.routes
* @returns
*/
const NestedRouting = ({ route }) => {
  const { path, layout, nested: _offsprings = [] } = route;

  return _offsprings.length ? (
    <RenderRouteOffsprings route={route} />
  ) : (
    <Route
    path={path}
    exact
    render={() => <RenderInLayout layout={layout} page={route} />}
    />
  );
};

/**-----------------------------------------------
* Renders page in layout
* @param {object} props {layout, page}
* @returns
-----------------------------------------------*/
function RenderInLayout({ layout = {}, page }) {
  try {
    if(layout){
      const { name = 'default', props = {} } = layout;

      const PageLayout = (function (name) {
        return require(`../layouts/${name}.js`).default;
      })(name);

      return React.createElement(
        PageLayout,
        { ...props, page },
        <PageRenderer page={page} />
      );
    } 
    return React.createElement(PageRenderer, {
      page
    });
  } catch (error) {
    console.error(error.message);
  }
}

/**-----------------------------------------------
* Renders the Page
* @params {object} props {page}
* @returns
-----------------------------------------------*/
function PageRenderer({ page }) {
  return page.component ? <page.component /> : <PageNotFound />;
}

/**-----------------------------------------------
* Renders nested routes
* @param {object} props {parent, offspring}
* @returns
-----------------------------------------------*/
function RenderRouteOffsprings({ route }) {
  const { nested = [] } = route;
  return (
    <Switch>
    {nested.map((_offspring) => {
      const { path, label, layout, nested: _offsprings = [] } = _offspring;

      //if offspring's layout is undefined
      // inherit
      if (layout === undefined) {
        Object.assign(_offspring, { layout: route.layout });
      }
      //Add parent to route object
      if (_offspring.redirect === undefined) {
        if (
          _offspring.isEnumerable === undefined ||
          _offspring.isEnumerable === true
        )
        _offspring.parent = route;
        else _offspring.parent = route.parent;
      }

      return (
        <Route key={label} path={path}>
        {" "}
        {_offspring.redirect === undefined ? (
          _offsprings.length ? (
            <RenderRouteOffsprings route={_offspring} />
          ) : (
            <Route
            path={path}
            exact
            render={() => (
              <RenderInLayout
              layout={_offspring.layout}
              page={_offspring}
              />
            )}
            />
          )
        ) : (
          <>
          <Route
          path={path}
          exact
          render={() => {
            return <Redirect to={_offspring.redirect} />;
          }}
          />
          <Route component={() => <PageNotFound />} />
          </>
        )}
        </Route>
      );
    })}
    <Route
    path={route.path}
    exact
    render={() => <RenderInLayout layout={route.layout} page={route} />}
    />
    <Route component={() => <PageNotFound />} />
    </Switch>
  );
}
