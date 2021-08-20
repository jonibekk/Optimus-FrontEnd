import {
    KR_NUMERIC,
    KR_PERSENTAGE,
    KR_CURRENCY,
    KR_TRUE_FALSE
} from '../../../enums/KrUnit';
import './style.css';

const KrMeasureItem = ({ selected, type, onSelected }) => {

    let typeIcon = '';
    let typeText = '';
    if (type === KR_NUMERIC) {
        typeIcon = <i className="fas fa-hashtag"></i>;
        typeText = 'Numeric';
    } else if (type === KR_PERSENTAGE) {
        typeIcon = <i className="fas fa-percentage"></i>;
        typeText = 'Percentage';
    } else if (type === KR_CURRENCY) {
        typeIcon = <i className="fas fa-yen-sign"></i>;
        typeText = 'Currency';
    } else if (type === KR_TRUE_FALSE) {
        typeIcon = '1/0';
        typeText = 'True/False';
    }

    return (
        <div
            style={{ border: selected ? '2px solid var(--contentPrimary)' : '1px dashed var(--borderLine)' }}
            className='measurement-wrapper'
            onClick={() => onSelected('unit', type)}>
            <span
                className='measurement-unit-icon'
                style={{
                    background: selected ? 'var(--contentPrimary)' : '',
                    color: selected ? 'white' : 'var(--fgGray)'
                }}>
                {typeIcon}
            </span>
            <h5
                className='measurement-unit-text'
                style={{ color: selected ? 'var(--contentPrimary)' : 'var(--fgGray)' }}>
                {typeText}
            </h5>
        </div>
    )
}

export default KrMeasureItem
