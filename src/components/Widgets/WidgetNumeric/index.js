import './style.css'

const WidgetNumeric = ({ color, value, unit, title, icon }) => {

    return (
        <div className='widget-numeric-wrapper' style={{ background: `${color}dd` }}>
            <div className='widget-numeric-div1' style={{ background: color }}>
                <ion-icon name={icon}></ion-icon>
            </div>
            <div className='widget-numeric-div2'>
                <span>{value}{unit}</span>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default WidgetNumeric;
