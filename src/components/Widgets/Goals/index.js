import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css'

const GoalsWidget = () => {

    const ui = useSelector(state => state.ui);
    const history = useHistory();

    return (
        <div className='goals-widget' onClick={() => history.push('/goals')}>
            <div className='goals-widget-upper'>
                <ion-icon name="trophy-outline"></ion-icon>
                <div></div>
                <span>Goals</span>
            </div>
            <div className='goals-widget-lower'>
                {ui.goalsWidget}
            </div>
        </div>
    )
}

export default GoalsWidget;
