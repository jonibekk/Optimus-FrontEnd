import { memo, useState } from 'react';
import GoalItem from '../../../components/UI/GoalItem';
import EmptyGoalUrl from '../../../assets/goal.svg';

import './style.css';

const SubscribedGoal = ({ goals }) => {
    const [open, setOpen] = useState(goals && goals.length > 0);

    const subGoals = goals && goals.length > 0
        ? goals.map(goal => <GoalItem key={goal.id} goal={goal} isMember />)
        : <img style={{ maxWidth: '500px' }} src={EmptyGoalUrl} alt='empty' />

    return (
        <div className='subs-goals-wrapper'>
            <div className='subs-goals-header'>
                <div onClick={() => setOpen(!open)} className={`subs-goals-arrow-trigger ${open && 'arrow-rotate-open'}`}></div>
                <span style={{ color: 'var(--fgGray)', fontWeight: 'bold' }}>Subscribed goals</span>
            </div>
            <div className='subs-goals-body' style={{ display: open && 'flex' }}>
                {subGoals}
            </div>
        </div>
    )
}

export default memo(SubscribedGoal);
