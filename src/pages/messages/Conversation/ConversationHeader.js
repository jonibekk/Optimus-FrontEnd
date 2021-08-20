import './style.css'

const ConversationHeader = () => {

    const onSearchSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='conversation-header'>
            <div className='conversation-header-user'>User Name</div>
            <form onSubmit={onSearchSubmit}>
                <input className='conversation-header-search-input' type='text' placeholder='search' />
            </form>
            <span className='conversation-header-setting'><i className='fas fa-ellipsis-h'></i></span>
        </div>
    )
}

export default ConversationHeader