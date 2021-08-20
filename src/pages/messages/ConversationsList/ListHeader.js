import { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/UI/Avatar';
import FormControl from '../../../components/UI/FormControl';
import './style.css'


export const CreateNewRoom = () => {

    const [newRoom, setNewRoom] = useState({
        roomName: '',
        memberSearch: '',
        roomMembers: []
    });

    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);

    const onChangeName = (name, value) => setNewRoom({ ...newRoom, [name]: value });

    const onSearchUserResult = () => {
        const filtered = user.users.filter((usr, _i) => {
            const fullInfo = usr.first_name.concat(usr.last_name).concat(usr.email).toLowerCase();

            if (auth.meData.id === usr.id) {
                return false;
            }
            if (newRoom.memberSearch.trim().length === 0) {
                return true;
            }

            return fullInfo.includes(newRoom.memberSearch);
        });

        const jsx = filtered.map(usr => (
            <div key={usr.id} className='new-room-user-item'>
                <Avatar width='25px' height='25px' borderRadius='99px' src={usr.avatar_url} />
                <span>{usr.first_name + ' ' + usr.last_name}</span>
            </div>
        ));

        return jsx;
    }

    return (
        <div className='new-chatroom-wrapper'>
            <h5>Create new chat-room</h5>
            <div className='new-room-name'>
                <FormControl
                    type='text'
                    name='roomName'
                    placeholder='New room name...'
                    value={newRoom.roomName}
                    onchange={onChangeName}
                    required />
            </div>
            <div className='new-room-add-members'>
                <FormControl
                    type='text'
                    name='memberSearch'
                    placeholder='Add members: Enter name'
                    value={newRoom.memberSearch}
                    onchange={onChangeName}
                    required />
                <div className='new-room-invited-members'>
                    {onSearchUserResult()}
                </div>
            </div>
        </div>
    );
}


const ListHeader = () => {

    const [showCreateRoom, setShowCreateRoom] = useState(false);

    const onSearchSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='list-header-wrapper'>
            <form onSubmit={onSearchSubmit}>
                <input className='list-header-search-input' type='text' placeholder='search' />
            </form>
            <div className='create-new-chatroom'>
                <span
                    onClick={() => setShowCreateRoom(!showCreateRoom)}
                    style={{ fontSize: '15px' }}
                    className='list-header-create-new'>
                    <i className="fas fa-edit"></i>
                </span>
                {showCreateRoom && <CreateNewRoom />}
            </div>
        </div>
    )
}

export default ListHeader
