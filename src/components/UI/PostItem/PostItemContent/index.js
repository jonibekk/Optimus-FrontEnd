import './style.css'

function PostItemContent({ data }) {

    return (
        <div className='post-item-content'>
            <div className='post-item-content-wrapper'>
                <span className='content-top-drop'></span>
                <span className='content-goal-name'><i className="fas fa-bullseye goal-icon"></i>&nbsp; {data.action.goal.name}</span>
                <img className='content-img' alt='content' src={data.media[0].file_url} />
                <span className='content-bottom-drop'></span>
                <div className='content-kr-info'>
                    <span><i className="fas fa-key kr-icon"></i>&nbsp; {data.action.key_result.name}</span>
                </div>
                <div className="progress">
                    <div className="content-kr-progress progress-bar" style={{ width: `${data.action.key_result.progress}%` }} role="progressbar"></div>
                </div>
            </div>
            <div>
                <p className='content-body'>{data.action.body}</p>
            </div>
            <div className='content-action-wrapper'>
                <span><i className="fas fa-heart"></i>&nbsp; {data.action.likes_count > 0 && data.action.likes_count} likes</span>
                <span><i className="fas fa-comment-dots"></i>&nbsp; {data.action.comments_count > 0 && data.action.comments_count} comments</span>
            </div>
        </div>
    )
}

export default PostItemContent
