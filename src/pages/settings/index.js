import { Switch } from 'react-router'
import PrivateRoute from '../../components/Routes/PrivateRoute'
import Header from '../../components/UI/AuthHeader'
import Profile from './profile'
import Teams from './teams'
import TeamMembers from './team-members'
import Integrations from './integrations'
import Display from './display'
import Logout from './logout'
import SettingSidebar from './SettingSidebar'
import './style.css'

const Settings = () => {

    return (
        <div className='settings-container'>
            <Header logo />
            <div className='settings-main-wrapper'>
                <div className='settings-main'>
                    <section className='settings-sidebar'>
                        <h1>Settings</h1>
                        <SettingSidebar />
                    </section>
                    <section className='settings-body'>
                        <Switch>
                            <PrivateRoute path='/settings/profile' component={Profile} />
                            <PrivateRoute path='/settings/teams' component={Teams} />
                            <PrivateRoute path='/settings/team-members' component={TeamMembers} />
                            <PrivateRoute path='/settings/integrations' component={Integrations} />
                            <PrivateRoute path='/settings/display' component={Display} />
                            <PrivateRoute path='/settings/logout' component={Logout} />
                        </Switch>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Settings
