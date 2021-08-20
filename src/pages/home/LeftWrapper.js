import './style.css'

import ActivityGraph from '../../components/Widgets/ActivityGraph'
import ActionsWidget from '../../components/Widgets/Actions'
import GoalsWidget from '../../components/Widgets/Goals'

const LeftWrapper = () => {
    return (
        <div className='left-wrap-container'>
            <div className='left-wrap-activity-heatmap'>
                <ActivityGraph numberOfDays={-90} />
            </div>
            <div className='left-wrap-action-goal-widgets'>
                <ActionsWidget />
                <GoalsWidget />
            </div>
        </div>
    )
}

export default LeftWrapper
