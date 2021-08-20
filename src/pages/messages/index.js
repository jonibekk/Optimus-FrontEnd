import { matchPath, useHistory } from 'react-router';
import PrivateRoute from '../../components/Routes/PrivateRoute';
import Conversation from './Conversation';
import ConversationsList from './ConversationsList';
import NoMessage from '../../assets/maibox.svg';
import './style.css';

const Messages = () => {

    const history = useHistory();
    const match = matchPath(history.location.pathname, { path: '/messages/:conversationUuid', exact: true, strict: false });

    return (
        <div className='messages-container'>
            <ConversationsList />
            {!match
                ? <div className='no-message-body'><img src={NoMessage} alt='NoMessage' /></div>
                : <PrivateRoute exact path='/messages/:conversationUuid' component={Conversation} />
            }
        </div>
    )
}

export default Messages;
