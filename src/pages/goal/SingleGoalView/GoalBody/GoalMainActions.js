import ActoinItemMini from '../../../../components/UI/ActionItemMini';
import './style.css'

const GoalMainActions = ({ actions, color }) => {

    const actionList = actions.map(action => <ActoinItemMini key={action.id} action={action} />);
    return (
        <div className='actions-wrapper'>
            <div>
                {actionList}
            </div>
        </div>
    )
}

export default GoalMainActions