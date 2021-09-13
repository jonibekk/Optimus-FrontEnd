import { useState } from 'react';
import WidgetNumeric from '../../components/Widgets/WidgetNumeric';
import './style.css';

const Dashboard = () => {

    const [quarter, setQuarter] = useState(0);
    const [year] = useState(null);

    const onQuarterChange = (number) => {
        if (quarter === number) {
            setQuarter(0);
        } else {
            setQuarter(number);
        }
    }

    return (
        <div className='dashboard-container'>
            <h2 className='dashboard-title'>Dashboard</h2>
            <div className='dashboard-statistics-wrapper'>
                <div className='dashboard-select-year'>
                    <small>Select a year</small>
                    <span className='dashboard-select-y-item'>{year ? year : 'Year'}</span>
                </div>
                <div className='dashboard-select-quarter'>
                    <small>Select a quarter</small>
                    <div>
                        <span className={`dashboard-select-Q-item ${quarter === 1 ? 'Q-item-selected' : ''}`} onClick={() => onQuarterChange(1)}>Q1</span>
                        <span className={`dashboard-select-Q-item ${quarter === 2 ? 'Q-item-selected' : ''}`} onClick={() => onQuarterChange(2)}>Q2</span>
                        <span className={`dashboard-select-Q-item ${quarter === 3 ? 'Q-item-selected' : ''}`} onClick={() => onQuarterChange(3)}>Q3</span>
                        <span className={`dashboard-select-Q-item ${quarter === 4 ? 'Q-item-selected' : ''}`} onClick={() => onQuarterChange(4)}>Q4</span>
                    </div>
                </div>
            </div>
            <div className='widgets-wrapper'>
                <WidgetNumeric color='#4361ee' value='27' title='Total goals' icon='trophy' />
                <WidgetNumeric color='#ef476f' value='56' title='Total key-results' icon='key' />
                <WidgetNumeric color='#560bad' value='123' title='Total actions' icon='checkmark-done-circle' />
            </div>
        </div>
    )
}

export default Dashboard;
