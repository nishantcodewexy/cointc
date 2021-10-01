import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const user = localStorage.getItem('user');
function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!user) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default  PrivateRoute