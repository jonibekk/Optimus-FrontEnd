import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Avatar from '../../Avatar'
import './style.css';

const PostItemHeader = ({ data }) => {

    const auth = useSelector(state => state.auth);
    const history = useHistory();
    dayjs.extend(relativeTime);
    const date = dayjs(data.postedDate);

    const onNameClicked = () => {
        history.push(`/user/${auth.meData.id === data.user.id ? 'me' : data.user.id}`);
    }
    const onPostImgClicked = () => {
        history.push({
            pathname: `/post/${data.postId}`,
            search: '?details',
            state: { prevPage: true }
        });
    }
    const onCopyLinkClicked = () => {
        console.log(`www.optimus.tech/post/${data.postId}`);
    }

    return (
        <div className='post-item-header'>
            <div className='post-item-user'>
                <Avatar width='35px' height='35px' borderRadius='var(--borderRounded)' user={data.user} src={data.user.avatar_url} />
                <div className='post-item-username-datetime'>
                    <span className='post-item-username' onClick={onNameClicked}>{data.user.first_name}&nbsp;{data.user.last_name}</span>
                    <span className='post-item-datetime'>{date.fromNow()}</span>
                </div>
            </div>
            <div className='dropdown'>
                <i className='fas fa-ellipsis-h' id="post-item-header-dropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul className="dropdown-menu" aria-labelledby="post-item-header-dropdown">
                    <li className="dropdown-item" onClick={onPostImgClicked}>Go to post</li>
                    <li className="dropdown-item" onClick={onCopyLinkClicked}>Copy link</li>
                </ul>
            </div>
        </div>
    )
}

export default PostItemHeader;
