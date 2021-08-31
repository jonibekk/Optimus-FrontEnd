import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css'

function Avatar({ user, src, width, height, borderRadius, onclick }) {

    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const url = src;

    const style = {
        'width': width,
        'height': height,
        'borderRadius': borderRadius
    }

    const onImageClicked = () => {
        if (user) {
            history.push(`/user/${auth.meData.id === user.id ? 'me' : user.id}`)
        } else if (onclick) {
            return onclick();
        }
    }

    return (
        <div className='avatar' style={style} onClick={onImageClicked}>
            <img src={url} alt='avatar' />
        </div>
    )
}

export default Avatar
