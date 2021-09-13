import './style.css'

import ActivityGraph from '../../components/Widgets/ActivityGraph'
import FeedWidget from '../../components/Widgets/FeedWidget'

const LeftWrapper = () => {
    return (
        <div className='left-wrap-container'>
            <div className='left-wrap-activity-heatmap'>
                <ActivityGraph numberOfDays={-90} />
            </div>
            <div className='left-wrap-action-goal-widgets'>
                <FeedWidget goal />
                <FeedWidget action />
            </div>
        </div>
    )
}

export default LeftWrapper
