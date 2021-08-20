import { useHistory } from 'react-router'
import './style.css'

const GoalHeader = ({ color }) => {

    const history = useHistory();

    const goBack = () => history.goBack();

    return (
        <div className='goal-header-background' style={{ background: `${color}AA` }}>
            <span className='goal-header-back' onClick={goBack}>{'<'} Back</span>
        </div>
    )
}

export default GoalHeader
