
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../../components/UI/Avatar';
import Button from '../../../components/UI/Button';
import TeamMembers from '../../../components/UI/team-members';
import {
    TEAM_OWNER,
    TEAM_ADMIN,
} from '../../../enums/TeamMemberType'
import { GetTeamUsersIncPending } from '../../../store/Actions/TeamAction';
import './style.css'

const Team = ({ team, onShow, onUpdateTeamInfo }) => {

    const dispatch = useDispatch();
    let imgUpload = useRef();
    const teams = useSelector(state => state.team);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const onImgRefClicked = () => imgUpload.click();

    const onImgFileChoose = (e) => setImage(e.target.files[0]);

    const onNameChange = (e) => setName(e.target.value);

    const onClose = () => {
        setName(team.name);
        setImage(null);
        onShow(false);
    }

    const isReadyToSaveChanges = () => {
        const nameChanged = team.name.trim() !== name.trim() && name.trim().length > 0;
        return nameChanged || image !== null;
    }

    const onUpdateTeamInf = () => {
        if (isReadyToSaveChanges()) {
            const fd = new FormData();
            fd.append('name', name);
            if (image !== null) {
                fd.append('avatar', image);
            }
            onUpdateTeamInfo(fd);
        }
    }

    useEffect(() => {
        if (team) {
            dispatch(GetTeamUsersIncPending(team.id));
            setName(team.name);
        }
    }, [dispatch, team]);

    return team && teams.currentTeamUsers && (
        <div className='team-setting-wrapper'>
            <header className='team-setting-header'>
                <div>
                    <input type='file' id='create-user-avatar'
                        style={{ display: 'none' }}
                        ref={ref => imgUpload = ref}
                        onChange={onImgFileChoose} accept="image/*" />
                    <Avatar
                        onclick={onImgRefClicked}
                        width='50px' height='50px'
                        borderRadius='99px'
                        src={image ? URL.createObjectURL(image) : team.logo_url} />
                    <div className='team-setting-name-wrapper'>
                        <input
                            className='team-setting-name-input'
                            name='name'
                            placeholder='Tema name'
                            value={name} onChange={onNameChange} />
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <Button
                        text='Save changes'
                        maxWidth='200px'
                        maxHeight='45px'
                        className={!isReadyToSaveChanges() ? 'btn__disabled' : 'btn__primary'}
                        onclick={onUpdateTeamInf} />
                </div>
                <span onClick={onClose}>&times;</span>
            </header>
            <TeamMembers
                height='calc(100vh - 220px)'
                OwnerOrAdmin={team.alias.member_type === TEAM_OWNER || team.alias.member_type === TEAM_ADMIN}
                members={teams.currentTeamUsers.members}
                pendingMembers={teams.currentTeamUsers.pending}
            />
        </div>
    )
}

export default Team;