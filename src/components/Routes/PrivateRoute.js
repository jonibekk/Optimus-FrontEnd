import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, location, path, ...rest }) => {

    const auth = useSelector(state => state.auth);

    if (auth.isAuthenticated === true) {
        if (auth.meData.current_team_id <= 0) {
            return <Redirect from={path} to={{ pathname: '/create-new-team', state: { fromPath: location.pathname } }} />;
        }
        return <Route {...rest} component={Component} />
    } else {
        return <Redirect from={path} to={{ pathname: '/login', state: { fromPath: location.pathname } }} />;
    }
}

export default PrivateRoute;