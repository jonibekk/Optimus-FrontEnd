import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '../../../../components/UI/Avatar';

import Pie from '../../../../components/UI/ProgressPie';
import './style.css'

const GoalMainHeader = ({ goal }) => {
    dayjs.extend(relativeTime);

    return (
        <div className='goal-main-header'>
            <section className='goal-main-header-info'>
                <div style={{ position: 'relative', width: '110px' }}>
                    <Pie percentage={goal.progress.toFixed(2)} color='#ffffff' width={100} height={100} fontSize="20px" strokeWidth={10} isPercentile />
                </div>
                <div className='goal-main-name-description'>
                    <span className='goal-main-name'>{goal.name}<span className='goal-main-edit-icon'><i className='fas fa-ellipsis-h'></i></span></span>
                    <p>{goal.description}</p>
                </div>
            </section>
            <section className='goal-main-header-members'>
                <small>{dayjs(goal.created_at).format('DD MMM, YYYY')}</small>
                <div className='goal-main-header-members-wrapper'>
                    <div className='avatars-wrapper'>
                        {
                            goal.member.map(member =>
                                <div className='avatar-item' key={member.id}>
                                    <Avatar width='30px' height='30px' borderRadius='var(--borderRound)' src={member.avatar_url} />
                                </div>)
                        }
                    </div>
                </div>
                <span>{goal.member.length} members</span>
            </section>
        </div>
    )
}

export default GoalMainHeader
