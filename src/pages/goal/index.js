import { Switch } from 'react-router';
import PrivateRoute from '../../components/Routes/PrivateRoute';
import './style.css';

import Goals from './GoalsPage';
import SingleGoalView from './SingleGoalView';
import { useEffect } from 'react';

const Goal = () => {

    useEffect(() => { }, []);

    return (
        <div>
            <Switch>
                <PrivateRoute exact path='/goals' component={Goals} />
                <PrivateRoute path='/goals/:goalId' component={SingleGoalView} />
            </Switch>
        </div>
    )
}

export default Goal;
