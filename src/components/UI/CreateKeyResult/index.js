import { useState } from 'react';
import Button from '../Button';
import FormControl from '../FormControl'
import Logo from '../Logo'
import KrMeasureItem from './KrMeasureItem';
import {
    KR_NUMERIC,
    KR_PERSENTAGE,
    KR_CURRENCY,
    KR_TRUE_FALSE,
} from '../../../enums/KrUnit';

import {
    TYPE_USD,
    TYPE_JPY,
    TYPE_KRW,
    TYPE_CNY,
    TYPE_EUR,
} from '../../../enums/CurrencyType'
import './style.css'


const CreateKeyResult = ({ goalId, showModal, onclick, onCreateKr }) => {

    const [data, setData] = useState({ name: 'Key Result', startValue: 0, targetValue: 1, unit: KR_NUMERIC });
    const [currency, setCurrency] = useState(TYPE_USD);

    const onNameChange = (name, value) => setData({ ...data, [name]: value });
    const onValueChange = (name, value) => setData({ ...data, [name]: value });

    const onCreate = () => {
        if (data.name.length > 0) {
            const fd = new FormData();
            fd.append('name', data.name);
            fd.append('goal_id', goalId);
            fd.append('unit', data.unit);
            if (data.unit === KR_TRUE_FALSE) {
                fd.append('start_value', 0);
                fd.append('target_value', 1);
                setData({ ...data, targetValue: 1 });
            }
            else if (data.unit === KR_CURRENCY) {
                fd.append('currency_type', currency.type);
                fd.append('start_value', data.startValue);
                fd.append('target_value', data.targetValue);
            } else {
                fd.append('start_value', data.startValue);
                fd.append('target_value', data.targetValue);
            }

            if (data.targetValue >= data.startValue) {
                onCreateKr(fd);
                onclick();
            }
        }
    }

    let typeIcon = '';
    if (data.unit === KR_NUMERIC) {
        typeIcon = <i className="fas fa-hashtag"></i>;
    } else if (data.unit === KR_PERSENTAGE) {
        typeIcon = <i className="fas fa-percentage"></i>;
    } else if (data.unit === KR_CURRENCY) {
        typeIcon = <i className="fas fa-yen-sign"></i>;
    } else if (data.unit === KR_TRUE_FALSE) {
        typeIcon = '1/0';
    }

    return (
        <div className='create-kr-container' style={{ 'display': showModal ? 'block' : 'none' }}>
            <div className='backdrop' onClick={onclick} />
            <div className='create-kr-wrapper'>
                <div className='create-kr-header'>
                    <Logo color='var(--contentPrimary)' size='30px' />
                    <span className='model-close' onClick={onclick}>&times;</span>
                </div>
                <div className='create-kr-content'>
                    <div className='create-kr-item'>
                        <label htmlFor='name'>Key-Result name:</label>
                        <small>Break down your Goal into pieces. Key-Results are measurable results,
                            that, when completed, will also complete the Goal.</small>
                        <FormControl type='text' name='name' value={data.name} onchange={onNameChange} required error={data.name.length === 0} />
                    </div>
                    <div className='create-kr-item'>
                        <label htmlFor='name'>Measurement type:</label>
                        <small>How do you want to measure this result?</small>
                        <div className='create-kr-item-measurements'>
                            <KrMeasureItem onSelected={onValueChange} selected={data.unit === KR_NUMERIC} type={KR_NUMERIC} />
                            <KrMeasureItem onSelected={onValueChange} selected={data.unit === KR_PERSENTAGE} type={KR_PERSENTAGE} />
                            <KrMeasureItem onSelected={onValueChange} selected={data.unit === KR_CURRENCY} type={KR_CURRENCY} />
                            <KrMeasureItem onSelected={onValueChange} selected={data.unit === KR_TRUE_FALSE} type={KR_TRUE_FALSE} />
                        </div>
                        {data.unit !== KR_TRUE_FALSE &&
                            <div className='create-kr-item-values'>
                                <FormControl type='number' name='startValue' value={data.startValue} onchange={onValueChange} required placeholder='Start' />
                                <div
                                    className='create-kr-unit-icon'
                                    style={{ color: 'var(--contentPrimary)' }}>
                                    {data.unit !== KR_CURRENCY && typeIcon}
                                    {data.unit === KR_CURRENCY &&
                                        <div className='dropdown'>
                                            <div className="create-kr-currency-text" id="currency-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                {currency.text}
                                            </div>
                                            <ul className="dropdown-menu" aria-labelledby="currency-dropdown">
                                                <li className="dropdown-item" onClick={() => setCurrency(TYPE_USD)}>{TYPE_USD.text}</li>
                                                <li className="dropdown-item" onClick={() => setCurrency(TYPE_JPY)}>{TYPE_JPY.text}</li>
                                                <li className="dropdown-item" onClick={() => setCurrency(TYPE_KRW)}>{TYPE_KRW.text}</li>
                                                <li className="dropdown-item" onClick={() => setCurrency(TYPE_CNY)}>{TYPE_CNY.text}</li>
                                                <li className="dropdown-item" onClick={() => setCurrency(TYPE_EUR)}>{TYPE_EUR.text}</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <FormControl type='number' name='targetValue' value={data.targetValue} onchange={onValueChange} required placeholder='Target' />
                            </div>
                        }
                    </div>

                    <Button className='btn__primary' maxHeight='45px' text='Create Key-Result' onclick={onCreate} />
                </div>
            </div>
        </div>
    )
}

export default CreateKeyResult;
