import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '../Avatar';
import './style.css'

const ActoinItemMini = ({ action }) => {
    dayjs.extend(relativeTime);

    return (
        <div className='mini-action-container'>
            <div className='mini-action-item'>
                <img src={action.attached_file[0].file_url} alt='something' />
                <div className='mini-action-item-content'>
                    <div>
                        <small>Key Result: </small>
                        <span className='mini-action-body'>{action.key_result.name}</span>
                    </div>
                    <div>
                        <span><i className="fas fa-heart"></i>&nbsp;{action.likes_count}</span>
                        <span><i className="fas fa-comment-dots"></i>&nbsp;{action.comments_count}</span>
                    </div>
                </div>
            </div>
            <div className='mini-action-footer'>
                <Avatar width='45px' height='45px' borderRadius='99px' />
                <div>
                    <h5>{action.user.first_name} {action.user.last_name}</h5>
                    <small>{dayjs(action.created_at).fromNow()}</small>
                </div>
            </div>
        </div>
    )
}

export default ActoinItemMini
