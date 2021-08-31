import './style.css';

import logo from '../../../assets/Logo_light.svg';
import logoMini from '../../../assets/Logo_mini.svg';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

const Logo = ({ mini }) => {

    const history = useHistory();
    const location = useLocation();

    const onLogoClicked = () => {
        if (location.pathname !== '/home') {
            history.push('/');
        }
    }

    return (
        <div className='logo' onClick={onLogoClicked} style={{ maxWidth: mini ? '40px' : '260px' }}>
            <img src={mini ? logoMini : logo} alt='logo' />
        </div>
    )
}

export default Logo;
