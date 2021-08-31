
import UseWindowDimensions from '../../Util/UseWindowDimentions';
import Logo from '../Logo';
import Notification from './Notification';
import SearchForm from './SearchForm';
import './style.css';
import UserControl from './UserControl';

const Header = ({ logo }) => {

    const { width } = UseWindowDimensions();

    return (
        <div className='header-container'>
            <nav className='header-nav'>
                <div className='nav-logo-wrapper'>
                    {logo && <Logo mini={width <= 1001} />}
                </div>
                <SearchForm />
                <div className='notify-user-control-container'>
                    <Notification />
                    <UserControl />
                </div>
            </nav>
        </div>
    )
}

export default Header
