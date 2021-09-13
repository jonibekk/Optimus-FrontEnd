import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import Avatar from '../../../components/UI/Avatar';
import Pie from '../../../components/UI/ProgressPie';
import { getMyTeams, updateTeamInfo } from '../../../store/actions/TeamAction';
import {
    TEAM_OWNER,
    TEAM_ADMIN,
    TEAM_MEMBER
} from '../../../enums/TeamMemberType'
import './style.css'
import Team from '../team-setting';

const Teams = () => {

    const [showTeamSetting, setShowTeamSetting] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const teams = useSelector(state => state.team);
    const history = useHistory();
    const dispatch = useDispatch();

    const teamActionType = (team) => {
        const type = team.alias.member_type;
        const jsx = (type === TEAM_OWNER || type === TEAM_ADMIN)
            ? <span>Settings</span>
            : <span>Leave team</span>

        return jsx;
    }

    const onTeamSelected = (team) => {
        const type = team.alias.member_type;
        if (selectedTeam !== team) {
            setSelectedTeam(team);
        }

        if (type === TEAM_OWNER || type === TEAM_ADMIN) {
            setShowTeamSetting(!showTeamSetting);
        } else if (type === TEAM_MEMBER) {
            console.log('Leave this team!');
        }
    }

    const teamsJsx = () => {
        const jsx = teams.myTeams.map((team, _) => {
            return (
                <div className='sett-teams-item' key={team.id}>
                    <div className='sett-team-avatar-wrapper'>
                        <div
                            className='avatar-backdrop'
                            onClick={() => onTeamSelected(team)}>
                            {teamActionType(team)}
                        </div>
                        <Avatar width='130px' height='130px' borderRadius='100px' src={team.logo_url} />
                    </div>
                    <h4>{team.name}</h4>
                </div>
            )
        });

        return jsx;
    }

    const onUpdateTeamInfo = async (formData) => {
        await dispatch(updateTeamInfo(selectedTeam.id, formData));
        setShowTeamSetting(false);
    }

    useEffect(() => {
        if (!teams.currentTeam) {
            dispatch(getMyTeams());
        }
    }, [dispatch, teams]);

    return teams.loading ? <h1>Loading...</h1> : (
        <div className='sett-teams-container'>
            <h2>My teams</h2>
            <div className='sett-teams-wrapper'>
                {teams.myTeams && teamsJsx()}
                <div className='sett-teams-item'>
                    <div className='sett-teams-item-create-team' onClick={() => history.push('/create-new-team')}>
                        <Pie percentage={100} text={'+'} color={'#333333'} width={130} height={130} fontSize="70px" strokeWidth={6} />
                    </div>
                    <h4>Create new team</h4>
                </div>
            </div>
            <div className='sett-team-modal-wrapper'
                style={{ top: showTeamSetting ? '100px' : '110vh' }}>
                <Team team={selectedTeam} onShow={(val) => setShowTeamSetting(val)} onUpdateTeamInfo={onUpdateTeamInfo} />
            </div>
        </div>
    )
}

export default Teams
