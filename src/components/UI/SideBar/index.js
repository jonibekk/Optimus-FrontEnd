import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '../Button';
import Logo from '../Logo';
import SideBarOption from './SideBarOption';
import CreateAction from '../CreatePostModal/CreateAction';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateTrigger } from '../../../store/Actions/UiAction';

const SideBar = () => {
    const location = useLocation();
    const history = useHistory();

    const uiState = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const [active, setActiveLink] = useState('/home');

    const onLinkClicked = (path) => setActiveLink(path);
    const onActionCreate = () => dispatch(actionCreateTrigger(!uiState.onActionCreate));

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div className='sidebar-container'>
            <div className='sidebar-logo-wrapper'>
                <Logo />
            </div>

            <SideBarOption onclick={onLinkClicked} path='/home' text='Home' iconClass='home-outline' active={active.startsWith('/home')} />
            <SideBarOption onclick={onLinkClicked} path='/goals' text='Goals' iconClass='trophy-outline' active={active.startsWith('/goals')} />
            <SideBarOption onclick={onLinkClicked} path='/messages' text='Messages' iconClass='chatbubbles-outline' active={active.startsWith('/messages')} />
            <SideBarOption onclick={onLinkClicked} path='/dashboard' text='Dashboard' iconClass='grid-outline' active={active.startsWith('/dashboard')} />
            {/*<SideBarOption onclick={onLinkClicked} path='/evaluation' text='Evaluation' iconClass='fas fa-gavel' active={active.startsWith('/evaluation')} />*/}
            {/* fas fa-bullseye */}
            <div className='sidebar-make-action'>
                <Button
                    icon={<ion-icon name="add-outline"></ion-icon>}
                    text='Make an action'
                    maxWidth='100%'
                    maxHeight='40px'
                    className='btn__primary' onclick={onActionCreate} />
            </div>
            <div className='sidebar-settings' onClick={() => history.push('/settings')}>
                <ion-icon name="settings-outline"></ion-icon>
                <span>Settings</span>
            </div>
            <CreateAction onclick={onActionCreate} showModal={uiState.onActionCreate} />
        </div>
    )
}

export default SideBar
