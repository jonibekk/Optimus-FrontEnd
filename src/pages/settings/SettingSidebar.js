import { NavLink } from 'react-router-dom'
import './style.css'

const SettingSidebar = () => {


    return (
        <div className='sett-sidebar-wrapper'>
            <NavLink to={`/settings/profile`} className='sett-sidebar-navlink' activeClassName='sett-sidebar-active'>
                <div className='sett-sidebar-item'>Profile</div>
            </NavLink>
            <NavLink to={`/settings/teams`} className='sett-sidebar-navlink' activeClassName='sett-sidebar-active'>
                <div className='sett-sidebar-item'>Teams</div>
            </NavLink>
            <NavLink to={`/settings/team-members`} className='sett-sidebar-navlink' activeClassName='sett-sidebar-active'>
                <div className='sett-sidebar-item'>Team Members</div>
            </NavLink>
            {/*<NavLink to={`/settings/integrations`} className='sett-sidebar-navlink' activeClassName='sett-sidebar-active'>
                <div className='sett-sidebar-item'>Integrations</div>
            </NavLink>*/}
            <NavLink to={`/settings/display`} className='sett-sidebar-navlink' activeClassName='sett-sidebar-active'>
                <div className='sett-sidebar-item'>Display</div>
            </NavLink>
            <NavLink to={`/settings/logout`} className='sett-sidebar-navlink' activeClassName='sett-sidebar-active'>
                <div className='sett-sidebar-item'>Logout</div>
            </NavLink>
        </div>
    )
}

export default SettingSidebar
