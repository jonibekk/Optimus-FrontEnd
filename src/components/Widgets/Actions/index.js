import { useSelector } from 'react-redux';
import './style.css'

const ActionsWidget = () => {

    const ui = useSelector(state => state.ui);

    return (
        <div className='actions-widget'>
            <div className='actions-widget-upper'>
                <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                <div></div>
                <span>Actions</span>
            </div>
            <div className='actions-widget-lower'>
                {ui.actionsWidget}
            </div>
        </div>
    )
}

export default ActionsWidget;
