import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Avatar from '../../Avatar'
import './style.css';

const PostItemHeader = ({ data }) => {

    dayjs.extend(relativeTime);
    const date = dayjs(data.postedDate);

    return (
        <div className='post-item-header'>
            <div className='post-item-user'>
                <Avatar width='35px' height='35px' borderRadius='var(--borderRounded)' src={data.user.avatar_url} />
                <div className='post-item-username-datetime'>
                    <span className='post-item-username'>{data.user.first_name}&nbsp;{data.user.last_name}</span>
                    <span className='post-item-datetime'>{date.fromNow()}</span>
                </div>
            </div>
            <div className='dropdown'>
                <i className='fas fa-ellipsis-h' id="post-item-header-dropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul className="dropdown-menu" aria-labelledby="post-item-header-dropdown">
                    <li className="dropdown-item">Open post</li>
                    <li className="dropdown-item">Copy link</li>
                </ul>
            </div>
        </div>
    )
}

export default PostItemHeader;
