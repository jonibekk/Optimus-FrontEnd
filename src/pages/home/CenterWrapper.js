import './style.css'

import PostItem from '../../components/UI/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadFeedData } from '../../store/Actions/HomeFeedAction';
import empty_feed from '../../assets/EmptyFeed.svg';
import ModalTrigger from '../../components/UI/CreatePostModal/ModalTrigger';
import { actionCreateTrigger } from '../../store/Actions/UiAction';

const CenterWrapper = () => {

    const feed = useSelector(state => state.feed);
    const dispatch = useDispatch();

    const onOpenModal = () => dispatch(actionCreateTrigger(true));

    useEffect(() => {
        if (!feed.feedActions) {
            dispatch(loadFeedData());
        }
    }, [dispatch, feed.feedActions]);

    const feedData = feed.isLoading ? 'Loading...' : feed.feedActions.map(action => <PostItem key={action.id} action={action} />);
    return (
        <div className='center-wrap-container'>
            <div className='create-modal-wrapper'>
                <ModalTrigger onclick={onOpenModal} />
            </div>
            {feedData.length > 0 ? feedData :
                <div>
                    <img className='emtpy_feed_img' alt='emtpy_feed' src={empty_feed} />
                    <h1 className='emtpy_feed_h1'>Empty Feed!</h1>
                </div>
            }
        </div>
    )
}

export default CenterWrapper;
