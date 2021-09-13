
import { useEffect, useState } from 'react';
import {
    TEAM_ADMIN,
    TEAM_MEMBER,
    TEAM_OWNER
} from '../../../enums/TeamMemberType';
import Avatar from '../Avatar';
import Button from '../Button';

import { validEmail } from '../../Util/Utils';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { inviteNewUserToTeam } from '../../../store/actions/TeamAction';

const TeamMembers = ({ height, OwnerOrAdmin, members, pendingMembers }) => {

    const auth = useSelector(state => state.auth);
    const team = useSelector(state => state.team);
    const dispatch = useDispatch();

    const [MemberData, setMemberData] = useState({ search: '', invite: '' });

    const onMemberDataChange = (name, value) => setMemberData({ ...MemberData, [name]: value });

    const role = (memberType) => {
        switch (memberType) {
            case TEAM_OWNER: return <span className='member-tag tag-owner'>Owner</span>;
            case TEAM_ADMIN: return <span className='member-tag tag-admin'>Admin</span>;
            case TEAM_MEMBER: return <span className='member-tag tag-member'>Member</span>;
            default: return <span className='member-tag tag-pending'>Pending</span>;
        }
    }

    const membersList = () => {

        const FilteredMembers = members.filter(member => {
            const combinedItem = [member.user.first_name, member.user.last_name, member.user.email].join('').toLocaleLowerCase();
            return combinedItem.includes(MemberData.search.toLocaleLowerCase());
        });

        const jsx = FilteredMembers.map(member => (
            <div key={member.id} className='team-member-main-body-item'>
                <div className='team-member-main-body-item-t1'>
                    <Avatar width='28px' height='28px' borderRadius='99px' src={member.user.avatar_url} />
                    {member.user.first_name}&nbsp;{member.user.last_name}
                </div>
                <div className='team-member-main-body-item-t2'>{member.user.email}</div>
                <div className='team-member-main-body-item-t3'>{role(member.member_type)}</div>
                <div className='team-member-main-body-item-t4'><i className='fas fa-ellipsis-h'></i></div>
            </div>
        ))

        return jsx;
    }

    const pendingList = () => {
        const FilteredPendingMembers = pendingMembers &&
            pendingMembers.filter(
                pending => pending.email.toLocaleLowerCase().includes(MemberData.search.toLocaleLowerCase())
            );

        const jsx = FilteredPendingMembers.length > 0 && FilteredPendingMembers.map(pend => (
            <div key={pend.email} className='team-member-main-body-item'>
                <div className='team-member-main-body-item-t1'>
                    <Avatar width='28px' height='28px' borderRadius='99px' />
                </div>
                <div className='team-member-main-body-item-t2'>{pend.email}</div>
                <div className='team-member-main-body-item-t3'>{role(pend.member_type)}</div>
                <div className='team-member-main-body-item-t4'><i className='fas fa-ellipsis-h'></i></div>
            </div>
        ))

        return jsx;
    }

    const onInviteMemberClicked = () => {
        const emails = MemberData.invite.split(',');

        let validEmailExist = false;
        const validEmails = [];
        emails.forEach(email => {
            if (email.trim().length > 0 && validEmail(email.trim()) && auth.meData.email !== email.trim()) {
                validEmails.push(email.trim());
                validEmailExist = true;
            }
        });
        if (validEmailExist) {
            const validInvites = validEmails.filter(distinct);
            const data = {
                invites: validInvites,
                from_user_id: auth.meData.id,
                team_id: auth.meData.current_team_id
            }

            dispatch(inviteNewUserToTeam(data));
        }

    }

    useEffect(() => {
        // 
    }, [dispatch, team.currentTeamUsers]);

    return (
        <div className='team-member-main' style={{ height: height }}>
            <div className='team-member-main-header'>
                <div className='team-member-main-header-seach'>
                    <span><i className='fas fa-search' /></span>
                    <input
                        type='text'
                        name='search'
                        value={MemberData.search}
                        onChange={(e) => onMemberDataChange('search', e.target.value)}
                        placeholder='Search by name/email' />
                </div>
                {OwnerOrAdmin &&
                    <div className='team-member-main-header-add-member'>
                        <input
                            type='text'
                            name='invite'
                            value={MemberData.invite}
                            onChange={(e) => onMemberDataChange('invite', e.target.value)}
                            placeholder='Invite people by email' />
                        <Button text='Invite' maxWidth='150px' maxHeight='37px' className='btn__primary' onclick={onInviteMemberClicked} />
                    </div>
                }
            </div>
            <div className='team-member-main-body'>
                <div className='team-member-main-body-title'>
                    <div className='team-member-main-body-item-t1'>NAME</div>
                    <div className='team-member-main-body-item-t2'>EMAIL</div>
                    <div className='team-member-main-body-item-t3'>ROLE</div>
                    <div className='team-member-main-body-item-t4'>SETTINGS</div>
                </div>
                {pendingMembers && pendingList()}
                {members && membersList()}
            </div>
        </div>
    )
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}

export default TeamMembers
