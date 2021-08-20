import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import './style.css'

const UnauthHeader = ({ invitation }) => {
    return (
        <nav className='unauth-header-container'>
            <div style={{ width: '200px' }}>
                <Logo />
            </div>
            <div className='unauth-nav-items-wrapper'>
                <NavLink className='unauth-nav-item' activeClassName='unauth-active' to='/login'>Login</NavLink>
                {!invitation && <NavLink className='unauth-nav-item' activeClassName='unauth-active' to='/register'>Create an account</NavLink>}
            </div>
        </nav>
    )
}

export default UnauthHeader
