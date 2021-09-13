import { useDispatch, useSelector } from 'react-redux'
import { TEAM_ADMIN, TEAM_OWNER } from '../../../enums/TeamMemberType';
import TeamMembersList from '../../../components/UI/team-members'
import './style.css'
import { useEffect } from 'react';
import { GetTeamUsersIncPending } from '../../../store/actions/TeamAction';

const TeamMembers = () => {

    const team = useSelector(state => state.team);
    const dispatch = useDispatch();

    useEffect(() => {
        if (team.currentTeam && !team.currentTeamUsers) {
            dispatch(GetTeamUsersIncPending(team.currentTeam.id));
        }
    }, [dispatch, team]);

    return (!team.loading && team.currentTeam && team.currentTeamUsers) && (
        <div className='team-members-container'>
            <h2>Team Members</h2>
            <div style={{ height: 'calc(100% - 200px)' }}>
                <TeamMembersList
                    height='calc(100vh - 250px)'
                    OwnerOrAdmin={
                        team.currentTeam.me.member_type === TEAM_OWNER ||
                        team.currentTeam.me.member_type === TEAM_ADMIN
                    } members={team.currentTeamUsers.members} pendingMembers={team.currentTeamUsers.pending} />
            </div>
        </div>
    )
}

export default TeamMembers
