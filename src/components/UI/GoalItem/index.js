import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { subscribeToGoalAction } from '../../../store/actions/GoalAction';

import Avatar from '../Avatar'
import Button from '../Button';
import Pie from '../ProgressPie';
import './style.css'

const GoalItem = ({ goal, isMine, isMember, isAllGoals }) => {
    dayjs.extend(relativeTime);

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    const history = useHistory();

    const onGoalClicked = () => history.push(`/goals/${goal.id}`);
    const deleteGoal = () => {
        console.log('deleteGoal');
    }
    const unsubscribeFromGoal = () => {
        console.log('unsubscribeFromGoal');
    }
    const subscribeToGoal = () => {
        dispatch(subscribeToGoalAction(auth.meData.id, auth.meData.current_team_id, goal.id));
    }
    const goalAction = () => {
        let actionButton = null;
        if (isMine) {
            actionButton = <Button onclick={deleteGoal} maxHeight='25px' className='btn__danger__rounded' text='Delete' />;
        } else if (isMember) {
            actionButton = <Button onclick={unsubscribeFromGoal} maxHeight='25px' className='btn__gray__rounded' text='Unsubscribe' />;
        } else if (isAllGoals) {
            const member = goal.member.filter(user => user.id === auth.meData.id);
            if (auth.meData.id !== goal.user_id && member.length === 0) {
                actionButton = <Button onclick={subscribeToGoal} maxHeight='25px' className='btn__primary__rounded' text='+Subscribe' />;
            }
        }

        return <div>{actionButton}</div>;
    }
    const canAddAction = () => {
        let canAddAction = false;
        if (isMine) {
            canAddAction = true;
        } else if (isMember) {
            canAddAction = true;
        } else if (isAllGoals) {
            const member = goal.member.filter(user => user.id === auth.meData.id);
            if (auth.meData.id !== goal.user_id && member.length === 0) {
                canAddAction = false;
            }
        }

        return canAddAction;
    }

    useEffect(() => {

    }, [dispatch]);

    return (
        <div className='goal-item-wrapper'
            style={{ background: hover ? `${goal.color}07` : 'var(--bkPageSecondary)' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>

            <div className='goal-item-header'>
                {goalAction()}
                <Avatar user={auth.meData} width='25px' height='25px' borderRadius='var(--borderRound)' src={goal.user.avatar_url} />
            </div>

            <div className='goal-item-ui'>
                <div className='goal-item-progress' onClick={onGoalClicked}>
                    <div>
                        <Pie percentage={goal.kr.length > 0 ? 100 : 0} text={goal.kr.length} color={goal.color} width={75} height={75} fontSize="28px" strokeWidth={8} />
                    </div>
                    <div style={{ background: `${goal.color}20` }}>
                        <span className='goal-item-kr-text' style={{ color: goal.color }}>Key-Results</span>
                    </div>
                </div>
                <div className='goal-item-kr' onClick={onGoalClicked}>
                    <div>
                        <Pie percentage={goal.progress.toFixed(2)} color={goal.color} width={75} height={75} fontSize="16px" strokeWidth={8} isPercentile />
                    </div>
                    <div style={{ background: `${goal.color}20` }}>
                        <span className='goal-item-progress-text' style={{ color: goal.color }}>Progress</span>
                    </div>
                </div>
                <div className='goal-item-add-kr' onClick={onGoalClicked} style={{ opacity: canAddAction() ? 1 : 0, pointerEvents: !canAddAction() && 'none' }}>
                    <div>
                        <Pie percentage={100} text='+' color='var(--fgGray)' width={75} height={75} fontSize="38px" strokeWidth={8} />
                    </div>
                    <div>
                        <span className='goal-item-add-kr-text'>Add KR</span>
                    </div>
                </div>
            </div>

            <span className='goal-item-name' onClick={onGoalClicked}>{goal.name}</span>

            <div className='goal-item-footer'>
                <div><small className='goal-item-created-date'>{dayjs(goal.created_at).format('DD MMM, YYYY')}</small></div>
            </div>
        </div>
    )
}

export default GoalItem
