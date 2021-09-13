import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import './style.css'

function ModalTrigger({ onclick }) {

    const auth = useSelector(state => state.auth);

    useEffect(() => { }, [auth]);

    return (
        <div className='post-modal-trigger-ui' onClick={onclick}>
            <div>
                <Avatar width='35px' height='35px' borderRadius='var(--borderRound)' src={auth.meData.avatar_url} />
                <span>Make an action...</span>
            </div>
            <div>
                <ion-icon name="images-outline"></ion-icon>
                <ion-icon name="document-attach-outline"></ion-icon>
            </div>
        </div>
    )
}

export default ModalTrigger
