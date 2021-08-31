import './style.css'

const CommentItem = (comment) => {
    return (
        <div className='comment-wrapper'>
            <div>
                Avatar
            </div>
            <div>
                <p>Body</p>
                <small>datetime</small>
            </div>
        </div>
    )
}

export default CommentItem
