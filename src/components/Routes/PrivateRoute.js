import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, location, path, ...rest }) => {

    const auth = useSelector(state => state.auth);

    if (auth.isAuthenticated === true) {
        return <Route {...rest} component={Component} />
    } else {
        return <Redirect from={path} to={{ pathname: '/login', state: { fromPath: location.pathname } }} />;
    }
}

export default PrivateRoute;