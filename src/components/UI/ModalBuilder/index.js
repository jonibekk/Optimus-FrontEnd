import './style.css'

const ModalBuilder = ({ component: Component, onclick, width, height, ...rest }) => {
    return (
        <div className='modal-builder'>
            <div className='backdrop' onClick={onclick} />
            <div className='modal-content' style={{ maxWidth: width, maxHeight: height }}>
                <Component {...rest} />
            </div>
        </div>
    )
}

export default ModalBuilder;
