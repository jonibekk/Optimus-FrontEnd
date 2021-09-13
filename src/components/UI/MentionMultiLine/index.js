import './style.css';

import { MentionsInput, Mention } from 'react-mentions';
import { useEffect } from 'react';
import { getAllUsers } from '../../../store/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';

const MentionMultiLine = ({ value, onChange, onAdd }) => {

    const user = useSelector(state => state.user)
    const team = useSelector(state => state.team)
    const dispatch = useDispatch();

    const suggestionJsx = (suggestion, search, highlightedDisplay, index, focused) => {

        return (
            <div className={`mention-suggested-item ${focused ? 'focused' : ''}`}>
                {suggestion.display}
            </div>
        )
    }

    useEffect(() => {
        if (team.currentTeam) {
            dispatch(getAllUsers(team.currentTeam.id));
        }
    }, [dispatch, team]);

    const mentionStyle = { background: '#7543c198' };
    const dataItems = user.users && user.users.map(user => ({
        id: user.id,
        display: `${user.first_name} ${user.last_name}`
    }));

    return (
        <div className="mention-multiple-triggers">
            <MentionsInput
                value={value}
                onChange={onChange}
                placeholder={"Describe your action..."}
                a11ySuggestionsListLabel={"Suggested mentions"}
                className='mentions'>

                <Mention
                    markup="@[__display__](user:__id__)"
                    trigger="@"
                    className='mentions-mention'
                    data={dataItems}
                    renderSuggestion={(suggestion, search, highlightedDisplay, index, focused) =>
                        suggestionJsx(suggestion, search, highlightedDisplay, index, focused)
                    }
                    onAdd={onAdd}
                    style={mentionStyle}
                />

            </MentionsInput>
        </div>
    )
}

export default MentionMultiLine
