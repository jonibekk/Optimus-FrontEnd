
import Logo from '../Logo';
import Notification from './Notification';
import SearchForm from './SearchForm';
import './style.css';
import UserControl from './UserControl';

const Header = ({ logo }) => {
    return (
        <div className='header-container'>
            <nav className='header-nav'>
                <div className='header-search'>
                    {logo && <Logo />}
                    <SearchForm />
                </div>
                <div className='notify-user-control-container'>
                    <Notification />
                    <UserControl />
                </div>
            </nav>
        </div>
    )
}

export default Header
