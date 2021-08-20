import { Fragment } from 'react';
import './style.css'

const FormInput = ({
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
            <div className='form-input-field'>
                <input
                    className={`form-input ${errorClass}`}
                    type={type} name={name}
                    placeholder={placeholder}
                    value={value}
                    number={number}
                    onChange={(e) => onChangeInput(e)}
                    required={required} />
            </div>
        </Fragment>
    )
}

export default FormInput;
