import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../store/Actions/UserAction';
import './style.css'

const Integrations = () => {

    const team = useSelector(state => state.team);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();



    useEffect(() => {
        if (team.currentTeam && !user.users) {
            dispatch(getAllUsers(team.currentTeam.id));
        }
    }, [dispatch, team, user]);

    return (
        <div className='integrations-container'>
            <h2>Integrations</h2>
            <div>
            </div>
        </div>
    )
}

export default Integrations;
