import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '../Button';
import SideBarOption from './SideBarOption';
import CreateAction from '../CreatePostModal/CreateAction';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateTrigger } from '../../../store/actions/UiAction';
import UseWindowDimensions from '../../Util/UseWindowDimentions';
import './style.css';

const SideBar = () => {

    const dispatch = useDispatch();
    const uiState = useSelector(state => state.ui);

    const [active, setActiveLink] = useState('/home');
    const { width } = UseWindowDimensions();
    const location = useLocation();
    const history = useHistory();

    const onLinkClicked = (path) => setActiveLink(path);
    const onActionCreate = () => dispatch(actionCreateTrigger(!uiState.onActionCreate));

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div className='sidebar-container'>
            <SideBarOption onclick={onLinkClicked}
                path='/home' text='Home'
                iconClass={active.startsWith('/home') ? 'home' : 'home-outline'}
                active={active.startsWith('/home')} />
            <SideBarOption onclick={onLinkClicked}
                path='/goals' text='Goals'
                iconClass={active.startsWith('/goals') ? 'trophy' : 'trophy-outline'}
                active={active.startsWith('/goals')} />
            <SideBarOption onclick={onLinkClicked}
                path='/dashboard' text='Dashboard'
                iconClass={active.startsWith('/dashboard') ? 'grid' : 'grid-outline'}
                active={active.startsWith('/dashboard')} />
            <div className='sidebar-make-action'>
                <Button
                    icon={<ion-icon name="add-outline"></ion-icon>}
                    text={width > 1201 ? 'Make an action' : ''}
                    maxWidth='100%'
                    maxHeight='40px'
                    className='btn__primary' onclick={onActionCreate} />
            </div>
            <div className='sidebar-settings' onClick={() => history.push('/settings')}>
                <ion-icon name="settings-outline"></ion-icon>
                <span>Settings</span>
            </div>
            {uiState.onActionCreate && <CreateAction onclick={onActionCreate} showModal={uiState.onActionCreate} />}
        </div>
    )
}

export default SideBar
