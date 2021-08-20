import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatRooms } from '../../../store/Actions/ChatAction';
import ContactsList from './ContactsList';
import ListHeader from './ListHeader';
import './style.css';

const ConversationsList = () => {

    const chat = useSelector(state => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        if (chat.chatRooms === null) {
            dispatch(getChatRooms());
        }
    }, [dispatch, chat]);

    return (
        <div className='conversations-list-wrapper'>
            <ListHeader />
            <ContactsList />
        </div>
    )
}

export default (ConversationsList);
