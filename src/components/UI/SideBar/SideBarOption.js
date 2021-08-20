import { NavLink } from 'react-router-dom';
import './style.css';

const SideBarOption = ({ path, text, iconClass, active, onclick }) => {

    const show = path !== undefined ?
        <NavLink to={path} className={`sidebar-option ${active && 'sidebar-option-active'}`} onClick={() => onclick(path)}>
            <ion-icon name={iconClass}></ion-icon>
            <span>{text}</span>
        </NavLink> :
        <div to={path} className={`sidebar-option ${active && 'sidebar-option-active'}`}>
            <ion-icon name={iconClass}></ion-icon>
            <span>{text}</span>
        </div>;

    return show;
}

export default SideBarOption;
