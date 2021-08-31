import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postLike } from '../../../../store/Actions/PostAction';
import './style.css'

function PostItemContent({ data }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    const [Liked, setLiked] = useState(false);

    const myLikeId = () => {
        const myLike = data.action.likes.filter(like => like.user_id === auth.meData.id);
        return myLike.length > 0 ? myLike[0].id : -1;
    }

    const onPostLikeAction = async () => {
        const status = Liked ? 'dislike' : 'like';
        await dispatch(postLike(data.action.id, status, myLikeId()))
            .then(success => {
                if (status === 'like') {
                    setLiked(success);
                } else {
                    setLiked(false);
                }
            }).catch((failed) => {
                console.log(failed);
            })
    }

    const onPostImgClicked = () => {
        history.push({
            pathname: `/post/${data.action.id}`,
            search: '?details',
            state: { prevPage: true }
        });
    }

    useEffect(() => {
        data.action.likes.forEach(like => {
            if (like.user_id === auth.meData.id) {
                setLiked(true);
                return;
            }
        });
    }, [auth, data.action.likes]);

    return (
        <div className='post-item-content'>
            <div className='post-item-content-wrapper'>
                <span className='content-top-drop'></span>
                <span className='content-goal-name'><i className="fas fa-bullseye goal-icon"></i>&nbsp; {data.action.goal.name}</span>
                <img onClick={onPostImgClicked} className='content-img' alt='content' src={data.media[0].file_url} />
                <span className='content-bottom-drop'></span>
                <div className='content-kr-info'>
                    <span><i className="fas fa-key kr-icon"></i>&nbsp; {data.action.key_result.name}</span>
                </div>
                <div className="progress">
                    <div className="content-kr-progress progress-bar" style={{ width: `${data.action.key_result.progress}%` }} role="progressbar"></div>
                </div>
            </div>
            <div>
                <p className='content-body'>{data.action.body}</p>
            </div>
            <div className='content-action-wrapper'>
                <span className={Liked ? 'post-item-liked' : ''} onClick={onPostLikeAction}>
                    {!Liked && <ion-icon name="heart-outline"></ion-icon>}
                    {Liked && <ion-icon name="heart"></ion-icon>}
                    &nbsp; {data.action.likes_count > 0 ? data.action.likes_count : 0} {data.action.likes_count === 1 ? 'like' : 'likes'}
                </span>
                <span><ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                    &nbsp; {data.action.comments_count > 0 && data.action.comments_count} comments
                </span>
            </div>
        </div>
    )
}

export default PostItemContent
