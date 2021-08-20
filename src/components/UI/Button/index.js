import { Fragment } from 'react';
import './style.css';

const Button = ({
    text,
    onclick,
    maxWidth,
    maxHeight,
    className,
    fontSize,
    icon,
    disabled
}) => {

    return (
        <Fragment>
            <button className={`btn_ ${className} ${disabled && 'btn__disabled'}`} onClick={onclick} style={{
                width: maxWidth,
                height: maxHeight,
                fontSize: fontSize && fontSize
            }}>
                {icon && <span className='btn__icon'>{icon}</span>}
                {text}
            </button>
        </Fragment>
    )
}

export default Button
