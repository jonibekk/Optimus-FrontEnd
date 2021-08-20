import './style.css'

function Avatar({ src, width, height, borderRadius, onclick }) {

    const url = src;

    const style = {
        'width': width,
        'height': height,
        'borderRadius': borderRadius
    }

    return (
        <div className='avatar' style={style} onClick={onclick ? (e) => onclick(e) : () => { }}>
            <img src={url} alt='avatar' />
        </div>
    )
}

export default Avatar
