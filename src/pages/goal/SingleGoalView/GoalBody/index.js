import GoalMainBody from './GoalMainBody'
import GoalMainHeader from './GoalMainHeader'
import './style.css'

const GoalBody = ({ goal }) => {

    return (
        <div className='goal-main-container'>
            <GoalMainHeader goal={goal} />
            <GoalMainBody goal={goal} />
        </div>
    )
}

export default GoalBody
