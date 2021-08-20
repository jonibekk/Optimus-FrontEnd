import { useSelector } from 'react-redux'
import Avatar from '../../Avatar'
import './style.css'

function PostItemFooter() {

    const auth = useSelector(state => state.auth);

    return (
        <div className='post-item-footer'>
            <Avatar width='25px' height='25px' borderRadius='var(--borderRounded)' src={auth.meData.avatar_url} />
            <textarea className='post-item-comment-area' placeholder='Comment here...' rows='1' />
        </div>
    )
}

export default PostItemFooter
