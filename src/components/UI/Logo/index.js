import './style.css';

import logo from '../../../assets/Logo_light.svg';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

const Logo = () => {

    const history = useHistory();
    const location = useLocation();

    const onLogoClicked = () => {
        if (location.pathname !== '/home') {
            history.push('/');
        }
    }

    return (
        <div className='logo' onClick={onLogoClicked}>
            <img src={logo} alt='logo' />
        </div>
    )
}

export default Logo;
