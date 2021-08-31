import { NavLink } from 'react-router-dom';
import './style.css';

const MobileBarOption = ({ path, text, iconClass, active, onclick }) => {

    const show = path !== undefined ?
        <NavLink to={path} className={`mobile-bar-option ${active && 'mobile-bar-option-active'}`} onClick={() => onclick(path)}>
            <ion-icon name={iconClass}></ion-icon>
        </NavLink> :
        <div to={path} className={`mobile-bar-option ${active && 'mobile-bar-option-active'}`}>
            <ion-icon name={iconClass}></ion-icon>
        </div>;

    return show;
}

export default MobileBarOption;
