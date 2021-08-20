import './style.css'
import {
    KR_CURRENCY,
    KR_NUMERIC,
    KR_PERSENTAGE,
    KR_TRUE_FALSE
} from '../../../enums/KrUnit';
import {
    TYPE_USD,
    TYPE_JPY,
    TYPE_KRW,
    TYPE_CNY,
    TYPE_EUR
} from '../../../enums/CurrencyType';

function KrProgressStick({ color, startValue, currentValue, targetValue, border, strokeWidth, unit, currencyType }) {

    const prct = (currentValue * 100) / targetValue;

    let typeIcon = '';
    if (unit === KR_NUMERIC) {
        typeIcon = <i className="fas fa-hashtag"></i>;
    } else if (unit === KR_PERSENTAGE) {
        typeIcon = <i className="fas fa-percentage"></i>;
    } else if (unit === KR_CURRENCY) {
        switch (currencyType) {
            case TYPE_USD.type: typeIcon = <small className='kr-item-currency'>{TYPE_USD.text}</small>; break;
            case TYPE_JPY.type: typeIcon = <small className='kr-item-currency'>{TYPE_JPY.text}</small>; break;
            case TYPE_KRW.type: typeIcon = <small className='kr-item-currency'>{TYPE_KRW.text}</small>; break;
            case TYPE_CNY.type: typeIcon = <small className='kr-item-currency'>{TYPE_CNY.text}</small>; break;
            case TYPE_EUR.type: typeIcon = <small className='kr-item-currency'>{TYPE_EUR.text}</small>; break;
            default: break;
        }
    } else if (unit === KR_TRUE_FALSE) {
        typeIcon = <i className='fas fa-toggle-on'></i>;
    }

    return (
        <div className='progress-stick'>
            <div className='progress-text'>
                <small>{typeIcon}</small>
                <small>{currentValue}/{targetValue}{unit === 1 && '%'}</small>
            </div>
            <div className='kr-progress-bar' style={{ height: `${strokeWidth}px`, borderRadius: `${border}px` }}>
                <div className='kr-progress-bar-shadow' style={{ borderRadius: `${border}px`, background: `${color}15` }} />
                <div className='kr-progress-bar-main' style={{ borderRadius: `${border}px`, width: `${prct}%`, background: `${color}` }} />
            </div>
        </div>
    )
}

export default KrProgressStick
