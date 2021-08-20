import { useState } from 'react';
import GoalItem from '../../../components/UI/GoalItem';
import EmptyGoalUrl from '../../../assets/goal.svg';
import './style.css';

const ExploreGoal = ({ goals }) => {
    const [open, setOpen] = useState(goals && goals.length > 0);

    const allGoals = goals && goals.length > 0
        ? goals.map(goal => <GoalItem key={goal.id} goal={goal} isAllGoals />)
        : <img style={{ maxWidth: '500px' }} src={EmptyGoalUrl} alt='empty' />

    return (
        <div className='explore-goals-wrapper'>
            <div className='explore-goals-header'>
                <div onClick={() => setOpen(!open)} className={`explore-goals-arrow-trigger ${open && 'arrow-rotate-open'}`}></div>
                <span style={{ color: 'var(--fgGray)', fontWeight: 'bold' }}>Explore goals</span>
            </div>
            <div className='explore-goals-body' style={{ display: open && 'flex' }}>
                {allGoals}
            </div>
        </div>
    )
}

export default ExploreGoal;
