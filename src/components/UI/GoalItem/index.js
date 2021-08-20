import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Avatar from '../Avatar'
import Button from '../Button';
import Pie from '../ProgressPie';
import './style.css'

const GoalItem = ({ goal, isMine, isMember, isAllGoals }) => {
    dayjs.extend(relativeTime);

    const [hover, setHover] = useState(false);
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const onGoalClicked = () => history.push(`/goals/${goal.id}`);

    let actionButton = null;
    let canAddAction = false;
    if (isMine) {
        actionButton = <Button maxHeight='25px' className='btn__danger__rounded' text='Delete' />;
        canAddAction = true;
    } else if (isMember) {
        actionButton = <Button maxHeight='25px' className='btn__gray__rounded' text='Unsubscribe' />;
        canAddAction = true;
    } else if (isAllGoals) {
        const member = goal.member.filter(user => user.id === auth.meData.id);
        if (auth.meData.id !== goal.user_id && member.length === 0) {
            actionButton = <Button maxHeight='25px' className='btn__primary__rounded' text='+Subscribe' />;
            canAddAction = false;
        }
    }

    return (
        <div className='goal-item-wrapper'
            onClick={onGoalClicked}
            style={{ background: hover ? `${goal.color}07` : 'var(--bkPageSecondary)' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div className='goal-item-header'>
                <div>{actionButton}</div>
                <Avatar width='25px' height='25px' borderRadius='var(--borderRound)' src={goal.user.avatar_url} />
            </div>
            <div className='goal-item-ui'>
                <div className='goal-item-progress'>
                    <div>
                        <Pie percentage={goal.kr.length > 0 ? 100 : 0} text={goal.kr.length} color={goal.color} width={75} height={75} fontSize="28px" strokeWidth={8} />
                    </div>
                    <div style={{ background: `${goal.color}20` }}>
                        <span className='goal-item-kr-text' style={{ color: goal.color }}>Key-Results</span>
                    </div>
                </div>
                <div className='goal-item-kr'>
                    <div>
                        <Pie percentage={goal.progress.toFixed(2)} color={goal.color} width={75} height={75} fontSize="16px" strokeWidth={8} isPercentile />
                    </div>
                    <div style={{ background: `${goal.color}20` }}>
                        <span className='goal-item-progress-text' style={{ color: goal.color }}>Progress</span>
                    </div>
                </div>
                <div className='goal-item-add-kr' style={{ opacity: canAddAction ? 1 : 0, pointerEvents: !canAddAction && 'none' }}>
                    <div>
                        <Pie percentage={100} text='+' color='var(--fgGray)' width={75} height={75} fontSize="38px" strokeWidth={8} />
                    </div>
                    <div>
                        <span className='goal-item-add-kr-text'>Add KR</span>
                    </div>
                </div>
            </div>
            <span className='goal-item-name'>{goal.name}</span>
            <div className='goal-item-footer'>
                <div><small className='goal-item-created-date'>{dayjs(goal.created_at).format('DD MMM, YYYY')}</small></div>
            </div>
        </div>
    )
}

export default GoalItem
