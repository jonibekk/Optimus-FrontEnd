import './style.css'

import PostItemHeader from './PostItemHeader';
import PostItemContent from './PostItemContent';
import PostItemFooter from './PostItemFooter';

import { ACTION_TYPE_MEDIA, ACTION_TYPE_FILE } from '../../../enums/FileType'

const PostItem = ({ action }) => {

    const header = {
        user: action.user,
        postedDate: action.created_at
    }
    const content = {
        action: action,
        media: action.attached_file.filter(file => file.file_type === ACTION_TYPE_MEDIA),
        attachment: action.attached_file.filter(file => file.file_type === ACTION_TYPE_FILE),
    }

    return (
        <div className='post-item-container'>
            <PostItemHeader data={header} />
            <PostItemContent data={content} />
            <PostItemFooter />
        </div>
    )
}

export default PostItem;
