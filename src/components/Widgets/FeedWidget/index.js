import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.css'

const FeedWidget = ({ action, goal }) => {

    const ui = useSelector(state => state.ui);

    useEffect(() => { }, [ui]);

    return (
        <div className='feed-widgets-wrapper'>
            <div className='feed-widgets-upper'>
                {action && <ion-icon name="checkmark-done-circle-outline"></ion-icon>}
                {goal && <ion-icon name="trophy-outline"></ion-icon>}
                <div></div>
                {action && <span>Actions</span>}
                {goal && <span>Goals</span>}
            </div>
            <div className='feed-widgets-lower'>
                {action && ui.actionsWidgetCount}
                {goal && ui.goalsWidgetCount}
            </div>
        </div>
    )
}

export default FeedWidget;
