import { matchPath, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Avatar from '../../../components/UI/Avatar';
import './style.css';


const ContactItem = ({ contactInfo }) => {
    const history = useHistory();
    const match = matchPath(history.location.pathname, { path: '/messages/:conversationUuid', exact: true, strict: false });

    const active = match && match.params.conversationUuid !== undefined && match.params.conversationUuid === contactInfo;
    return (
        <Link className='conversation-list-item' to={`/messages/${contactInfo}`}>
            <div className='contact-item-wrapper'
                style={{ background: active ? 'var(--bkPagePrimary)' : '' }}>
                <Avatar width='35px' height='35px' borderRadius='99px' />
                <div className='contact-item-user-info'>
                    <span>username</span>
                    <small>last message</small>
                </div>
                <div className='contact-item-datetime'><small>datetime</small></div>
            </div>
        </Link>
    );
}

const ContactsList = ({ contacts }) => {
    return (
        <div>
            <ContactItem contactInfo='uuid-uuid24-432d-kscs24r7' />
            <ContactItem contactInfo='uuid-uuid24-432d-jlww24r1' />
            <ContactItem contactInfo='uuid-uuid24-432d-soad24r2' />
            <ContactItem contactInfo='uuid-uuid24-432d-ochclsl4' />
        </div>
    )
}

export default (ContactsList);
