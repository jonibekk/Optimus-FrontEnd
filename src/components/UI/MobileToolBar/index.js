import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { actionCreateTrigger } from '../../../store/actions/UiAction';
import Button from '../Button';
import CreateAction from '../CreatePostModal/CreateAction';
import MobileBarOption from './SideBarOption';

const MobileToolBar = () => {
    const dispatch = useDispatch();
    const uiState = useSelector(state => state.ui);

    const [active, setActiveLink] = useState('/home');
    const location = useLocation();
    const history = useHistory();

    const onLinkClicked = (path) => setActiveLink(path);
    const onActionCreate = () => dispatch(actionCreateTrigger(!uiState.onActionCreate));

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div className='mobile-bar-wrapper'>
            <MobileBarOption onclick={onLinkClicked}
                path='/home' text='Home'
                iconClass={active.startsWith('/home') ? 'home' : 'home-outline'}
                active={active.startsWith('/home')} />
            <MobileBarOption onclick={onLinkClicked}
                path='/goals' text='Goals'
                iconClass={active.startsWith('/goals') ? 'trophy' : 'trophy-outline'}
                active={active.startsWith('/goals')} />
            <div className='mobile-bar-make-action'>
                <Button
                    icon={<ion-icon name="add-outline"></ion-icon>}
                    text=''
                    maxWidth='100%'
                    maxHeight='40px'
                    className='btn__primary' onclick={onActionCreate} />
            </div>
            <MobileBarOption onclick={onLinkClicked}
                path='/dashboard' text='Dashboard'
                iconClass={active.startsWith('/dashboard') ? 'grid' : 'grid-outline'}
                active={active.startsWith('/dashboard')} />
            <div className='mobile-bar-settings' onClick={() => history.push('/settings')}>
                <ion-icon name="settings-outline"></ion-icon>
            </div>
            <CreateAction onclick={onActionCreate} showModal={uiState.onActionCreate} />
        </div>
    )
}

export default MobileToolBar
