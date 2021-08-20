import "./style.css"


const Pie = ({ percentage, isPercentile, text, color, width, height, fontSize, strokeWidth }) => {

    const radius = (width - strokeWidth) / 2;

    const style = {
        cx: width / 2,
        cy: height / 2,
        r: radius
    }

    const circ = 2 * Math.PI * radius;
    const strokePct = ((100 - percentage) * circ) / 100;

    return (
        <div className="percent">
            <svg width={width} height={height}>
                <circle cx={style.cx} cy={style.cy} r={style.r} strokeWidth={`${strokeWidth}px`} strokeDasharray={circ} strokeDashoffset={0} stroke={`${color}20`} />
                <circle cx={style.cx} cy={style.cy} r={style.r} strokeWidth={`${strokeWidth}px`} strokeDasharray={circ} strokeDashoffset={strokePct} stroke={color} />
            </svg>
            <div className='number'>
                <h2 style={{ fontSize: fontSize, color: color }}>{isPercentile ? percentage : text}{isPercentile && <span>%</span>}</h2>
            </div>
        </div>
    );
};

export default Pie;
