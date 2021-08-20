
import { useParams } from 'react-router-dom'
import AuthHeader from '../../components/UI/AuthHeader'

import './style.css'

const UserProfile = () => {

    const params = useParams();
    console.log(params);

    return (
        <div className='user-profile-container'>
            <AuthHeader logo />
            User Profile
        </div>
    )
}

export default UserProfile
