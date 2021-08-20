import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SetAuth from './components/Util/SetAuth';
import { Auth } from './store/Actions/AuthAction';
import { getMyTeams } from './store/Actions/TeamAction';
import './App.css';
import Landing from './pages/landing';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import NotFound from './pages/notfound';
import WithSidebar from './components/Routes/WithSidebar';
import Dashboard from './pages/dashboard';
import Invitation from './pages/Invitation';
import Messages from './pages/messages';
import Goal from './pages/goal';
import Home from './pages/home';
import CreateTeam from './pages/createTeam';
import PrivateRoute from './components/Routes/PrivateRoute';
import Settings from './pages/settings';
import UserProfile from './pages/userProfile';

if (localStorage.getItem('jwt_token')) {
  SetAuth(localStorage.getItem('jwt_token'));
}

const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Auth());
    dispatch(getMyTeams());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path='/invitation/:token' component={Invitation} />
        <WithSidebar path='/home' component={Home} />
        <WithSidebar path='/goals' component={Goal} />
        <WithSidebar path='/messages' component={Messages} />
        <WithSidebar path='/dashboard' component={Dashboard} />
        <PrivateRoute location={props.location} exact path='/settings'><Redirect to='/settings/profile' /></PrivateRoute>
        <PrivateRoute location={props.location} exact path='/settings/:settingsId' component={Settings} />
        <PrivateRoute location={props.location} exact path='/create-new-team' component={CreateTeam} />
        <PrivateRoute location={props.location} exact path='/user/:id' component={UserProfile} />
        <Route location={props.location} path='*' component={NotFound} />
      </Switch>

    </div>
  );
}

export default App;