import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ACTION_TYPE_MEDIA, ACTION_TYPE_FILE } from '../../enums/FileType';
import { cleanPostDetails, postDetails } from '../../store/Actions/PostAction';
import AuthHeader from '../../components/UI/AuthHeader';
import './style.css'
import CommentItem from '../../components/UI/CommentItem';
import { Fragment } from 'react';
import Avatar from '../../components/UI/Avatar';

const Post = ({ location }) => {

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);
    const [CurrentImg, setCurrentImg] = useState(null);
    const [Liked, setLiked] = useState(false);

    const leavePage = () => {
        if (location.state && location.state.prevPage) {
            history.goBack();
        } else {
            history.push('/home');
        }
    }

    const getJsx = (post) => {

        const media = post.attached_file.filter(file => file.file_type === ACTION_TYPE_MEDIA);
        const attachments = post.attached_file.filter(file => file.file_type === ACTION_TYPE_FILE);

        if (CurrentImg === null) {
            setCurrentImg(media[0].file_url);
        }

        const showImages = media.map(file => {
            return (
                <img
                    key={file.id}
                    className={file.file_url === CurrentImg ? 'top-imgs-item top-imgs-item-active' : 'top-imgs-item'}
                    onClick={() => setCurrentImg(file.file_url)}
                    src={file.file_url}
                    alt={file.filename}>
                </img>
            );
        });

        const createdDate = post.created_at.slice(0, 10);

        const jsx = (
            <div className='post-details-wrapper'>
                <section className="post-detials-top-imgs">
                    <span onClick={leavePage}><ion-icon name="chevron-back-outline"></ion-icon>return</span>
                    {showImages}
                </section>

                <section className="post-detials-post-data">
                    {CurrentImg && <img src={CurrentImg} alt='something!' className='post-detials-post-data-preview' />}
                </section>

                <section className='post-detials-comments'>
                    <section className="post-detials-comment-form">
                        <div className='comment-form-actions'>
                            <div>
                                <div className={Liked ? 'comment-form-likes post-item-liked' : 'comment-form-likes'}>
                                    {!Liked && <ion-icon name="heart-outline"></ion-icon>}
                                    {Liked && <ion-icon name="heart"></ion-icon>}
                                    &nbsp; {post.likes_count > 0 ? post.likes_count : 0} {post.likes_count === 1 ? 'like' : 'likes'}
                                </div>
                                <div className='comment-form-likes'>
                                    <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                                    &nbsp; {post.comments_count > 0 && post.comments_count} comments
                                </div>
                            </div>
                            <div>
                                <small>{createdDate}</small>
                                &nbsp;
                                <Avatar user={post.user} width='30px' height='30px' borderRadius='99px' src={post.user.avatar_url} />
                            </div>
                        </div>
                    </section>

                    <section className="post-detials-comments-list">
                        <CommentItem />
                    </section>
                </section>
            </div>
        )

        return jsx;
    }

    useEffect(() => {
        dispatch(postDetails(params.id));
        if (ui.loading === false && ui.postDetails) {
            for (let i = 0; i < ui.postDetails.likes_count; i++) {
                if (ui.postDetails.likes[i].user_id === auth.meData.id) {
                    setLiked(true);
                }
            }
        }
    }, [dispatch, params]);

    return ui.loading ? <h1>loading...</h1> : (
        <div className='post-details-container'>
            <AuthHeader logo />
            {getJsx(ui.postDetails)}
        </div>
    )
}

export default Post
