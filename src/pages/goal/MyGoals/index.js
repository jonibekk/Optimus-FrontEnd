import { useState } from 'react';
import Button from '../../../components/UI/Button';
import GoalItem from '../../../components/UI/GoalItem';
import EmptyGoalUrl from '../../../assets/goal.svg';
import './style.css';
import CreateGoal from '../../../components/UI/CreateGoal';

const MyGoal = ({ goals, onCreateGoal }) => {

    const [open, setOpen] = useState(goals && goals.length > 0);
    const [createToggle, setCreateToggle] = useState(false);

    const myGoals = goals && goals.length > 0
        ? goals.map(goal => <GoalItem key={goal.id} goal={goal} isMine />)
        : <img style={{ maxWidth: '500px' }} src={EmptyGoalUrl} alt='empty' />

    return (
        <div className='my-goals-wrapper'>
            <div className='my-goals-header'>
                <div onClick={() => setOpen(!open)} className={`my-goals-arrow-trigger ${open && 'arrow-rotate-open'}`}></div>
                <span style={{ color: 'var(--fgGray)', fontWeight: 'bold' }}>My Goals</span>
                <div>
                    <Button
                        onclick={() => setCreateToggle(!createToggle)}
                        fontSize='14px'
                        maxHeight='25px'
                        text='+ New goal'
                        className='btn__primary' />
                </div>
            </div>
            <div className='my-goals-body' style={{ display: open && 'flex' }}>
                {myGoals}
            </div>
            <CreateGoal onclick={() => setCreateToggle(!createToggle)} showModal={createToggle} onCreateGoal={(data) => onCreateGoal(data)} />
        </div>
    )
}

export default MyGoal;
