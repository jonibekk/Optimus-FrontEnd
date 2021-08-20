import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Logout } from '../../../store/Actions/AuthAction';
import Avatar from '../Avatar';

import './style.css';

const UserControl = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = async () => {
        await dispatch(Logout());
        history.push('/login');
    }

    return auth.loading ? <div>Loading...</div> : (
        <div className="user-control dropdown">
            <div className="user-control-ui" id="user-control-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div className='nav-user-avatar-wrapper'>
                    <Avatar width='35px' height='35px' borderRadius='var(--borderRound)' src={auth.meData && auth.meData.avatar_url} />
                </div>
                <span className='nav-user-fullname'>
                    {auth.meData && auth.meData.first_name} {auth.meData && auth.meData.last_name}
                </span>
            </div>
            <ul className="dropdown-menu" aria-labelledby="user-control-dropdown">
                <li className="dropdown-item" onClick={onLogout}>Logout</li>
            </ul>
        </div>
    )
}

export default UserControl
