import './style.css'

const Fab = ({ backColor, text, fontColor, height, width }) => {

    return (
        <div className='fab' style={{ background: backColor, color: fontColor, height: height, minWidth: width }}>
            <span className='fab-text'>{text}</span>
        </div>
    )
}

export default Fab
