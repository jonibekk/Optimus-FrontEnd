import ConversationBody from './ConversationBody';
import ConversationHeader from './ConversationHeader';
import './style.css';

const Conversation = () => {

    return (
        <div className='conversation-wrapper'>
            <ConversationHeader />
            <ConversationBody />
        </div>
    )
}

export default Conversation;
