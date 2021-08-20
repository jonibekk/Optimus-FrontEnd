import KrItem from '../../../../components/UI/KrItem';
import './style.css'

const GoalMainKeyResults = ({ krs, color }) => {

    const krList = krs.map(kr => <KrItem key={kr.id} kr={kr} color={color} />);
    return (
        <div className='key-results-wrapper'>
            {krList}
        </div>
    )
}

export default GoalMainKeyResults