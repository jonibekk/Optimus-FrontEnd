/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef, useState } from 'react';
import { matchPath, useHistory, useParams } from 'react-router'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Avatar from '../../../components/UI/Avatar';
import './style.css'
import { Fragment } from 'react';

dayjs.extend(relativeTime);

const Messages = ({ message }) => {

    return (
        <div className='message-body-wrapper'>
            <div className='message-avatar'>
                <Avatar width='40px' height='40px' borderRadius='99px' />
            </div>
            <div className='message-body'>
                <div className='message-body-header'>
                    <span className='message-username'>username</span>
                    <span>{dayjs(Date.now()).format('DD/MM/YYYY')}</span>
                </div>
                <div className='message-body-text'>
                    <p>
                        simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>
        </div>
    )
}


const ConversationBody = () => {

    const [body, setBody] = useState('')
    const textRef = useRef();
    const messageRef = useRef();
    const history = useHistory();
    const params = useParams();
    const match = matchPath(history.location.pathname, { path: '/messages/:conversationUuid' });

    const onChangeHandler = (e) => {
        const target = e.target;
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${target.scrollHeight}px`;
        setBody(target.value);
    }

    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom();
    }, [match.params])

    return (
        <div className='conversation-body'>
            <div className='messages-wrapper'>
                <Messages message={match.params.conversationUuid} />
                <div style={{ paddingBottom: '10px' }} ref={messageRef} />
            </div>
            <div className='create-message-wrapper'>
                <span className='message-media-upload'><i className="fas fa-photo-video"></i></span>
                <textarea
                    value={body}
                    onChange={onChangeHandler}
                    className='message-textarea'
                    ref={textRef}
                    type='text'
                    placeholder='Message'
                    rows='1' />
                <span
                    className='message-send-btn'
                    style={body.length > 0 ? {
                        color: 'var(--contentPrimary)',
                        cursor: 'pointer'
                    } : {}}
                >
                    Send
                </span>
            </div>
        </div>
    )
}

export default memo(ConversationBody)