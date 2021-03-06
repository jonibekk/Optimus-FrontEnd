import MyGoal from '../MyGoals';
import SubscribedGoals from '../SubscribedGoals';
import ExploreGoals from '../ExploreGoals';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createGoal } from '../../../store/actions/GoalAction';
import './style.css';

const Goal = () => {

    const auth = useSelector(state => state.auth);
    const team = useSelector(state => state.team);
    const goals = useSelector(state => state.goal);
    const dispatch = useDispatch();

    const onCreateGoal = (data) => {
        dispatch(createGoal(team.currentTeam.id, auth.meData.id, data));
    }

    useEffect(() => { }, [dispatch]);

    const myGoals = goals.myGoals ?? [];
    const subscribedGoals = goals.subscribedGoals ?? [];
    const allGoals = goals.allGoals ?? [];

    return (
        goals.loading ? <h1>Loading...</h1> : (
            <div className='goals-container'>
                <section className='goals-my-goals'>
                    {myGoals && <MyGoal goals={myGoals} onCreateGoal={onCreateGoal} />}
                </section>
                <section className='goals-subscribed-goals'>
                    {subscribedGoals && <SubscribedGoals goals={subscribedGoals} />}
                </section>
                <section className='goals-all-goals'>
                    {allGoals && <ExploreGoals goals={allGoals} />}
                </section>
            </div>
        )
    )
}

export default Goal;
