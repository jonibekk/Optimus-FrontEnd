import './style.css';

import { MentionsInput, Mention } from 'react-mentions';

const MentionMultiLine = ({ value, data, onChange, onAdd }) => {

    const mentionStyle = {
        background: '#7543c198',
    }

    const suggestionJsx = (suggestion, search, highlightedDisplay, index, focused) => {

        return (
            <div className={`mention-suggested-item ${focused ? 'focused' : ''}`}>
                {suggestion.display}
            </div>
        )
    }

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
                    data={data}
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
