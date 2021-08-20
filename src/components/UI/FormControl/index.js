import { Fragment } from 'react';
import './style.css'

const FormControl = ({
    type,
    name,
    placeholder,
    value,
    onchange,
    required,
    number,
    error
}) => {

    const onChangeInput = (e) => {
        onchange(name, e.target.value);
    }

    const errorClass = error ? 'error-input' : '';

    return (
        <Fragment>
            <div className='form-field'>
                <input
                    className={`form-control-input ${errorClass}`}
                    type={type} name={name}
                    placeholder=' '
                    value={value}
                    number={number}
                    onChange={(e) => onChangeInput(e)}
                    required={required} />
                <span className='form-label' >{placeholder}</span>
            </div>
        </Fragment>
    )
}

export default FormControl;
