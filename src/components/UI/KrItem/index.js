import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '../Avatar';
import KrProgressStick from '../KrProgress';
import Pie from '../ProgressPie';
import './style.css'

const KrItem = ({ kr, color }) => {
    dayjs.extend(relativeTime);

    return (
        <div className='kr-item-container'>
            <div className='kr-item-content'>
                <div style={{ position: 'relative', width: '75px' }}>
                    <Pie percentage={kr.progress} color={color} width={70} height={70} fontSize="16px" strokeWidth={7} isPercentile />
                </div>
                <div className='kr-item-info'>
                    <span className='kr-name'>{kr.name}<span className='kr-edit-icon'><i className='fas fa-ellipsis-h'></i></span></span>
                    <KrProgressStick
                        color={color}
                        startValue={kr.start_value}
                        currentValue={kr.current_value}
                        targetValue={kr.target_value}
                        border={99} strokeWidth={10} unit={kr.unit}
                        currencyType={kr.currency_type} />
                </div>
            </div>
            <div className='kr-owner-date-wrapper'>
                <Avatar width='25px' height='25px' borderRadius='var(--borderRound)' />
                <small>{dayjs(kr.created_at).format('DD MMM, YYYY')}</small>
            </div>
        </div>
    )
}

export default KrItem
