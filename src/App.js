import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SetAuth from './components/Util/SetAuth';
import { Auth } from './store/actions/AuthAction';
import './App.css';
import Landing from './pages/landing';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import NotFound from './pages/notfound';
import WithSidebar from './components/Routes/WithSidebar';
import Dashboard from './pages/dashboard';
import Invitation from './pages/Invitation';
import Goal from './pages/goal';
import Home from './pages/home';
import CreateTeam from './pages/createTeam';
import PrivateRoute from './components/Routes/PrivateRoute';
import Settings from './pages/settings';
import UserProfile from './pages/userProfile';
import Post from './pages/post';

if (localStorage.getItem('jwt_token')) {
  SetAuth(localStorage.getItem('jwt_token'));
}

const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAuthAndTeamData() {
      await dispatch(Auth());
    }
    getAuthAndTeamData();
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path='/invitation/:token' component={Invitation} />
        <Route exact path='/create-new-team' component={CreateTeam} />
        <WithSidebar path='/home' component={Home} />
        <WithSidebar path='/goals' component={Goal} />
        <WithSidebar path='/dashboard' component={Dashboard} />
        <PrivateRoute location={props.location} exact path='/settings'><Redirect to='/settings/profile' /></PrivateRoute>
        <PrivateRoute location={props.location} exact path='/settings/:settingsId' component={Settings} />
        <PrivateRoute location={props.location} exact path='/user/:id' component={UserProfile} />
        <PrivateRoute location={props.location} exact path='/post/:id' component={Post} />
        <Route location={props.location} path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;