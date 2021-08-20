import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentGoalWithData } from '../../../store/Actions/GoalAction';
import EmptyGoal from '../../../assets/goal.svg'
import GoalHeader from './GoalHeader'
import GoalBody from './GoalBody'
import './style.css';

const GoalView = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const goal = useSelector(state => state.goal);

    useEffect(() => {
        dispatch(getCurrentGoalWithData(params.goalId));
    }, [dispatch, params]);


    const content = goal.currentGoal && (
        <div className='goal-container'>
            <GoalHeader color={goal.currentGoal.color} />
            <GoalBody goal={goal.currentGoal} />
        </div>
    );

    return (goal.loading || goal.currentGoalWithData === null) ? <img alt='empty' src={EmptyGoal} /> : content;
}

export default memo(GoalView)
