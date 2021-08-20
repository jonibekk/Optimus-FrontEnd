import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import CalendarHeatmap from "react-calendar-heatmap";
import { loadActivityHeatmap } from "../../../store/Actions/UiAction";

import { shiftDate } from '../../Util/Utils';

import './style.css';

const ActivityGraph = ({ numberOfDays }) => {

    const dispatch = useDispatch();
    const ui = useSelector(state => state.ui);
    const today = new Date();

    useEffect(() => {
        if (ui.activityHeatmap === null) {
            dispatch(loadActivityHeatmap());
        }
    }, [dispatch, ui.activityHeatmap]);

    const heatMap = getFullHeatMap(numberOfDays * (-1), ui.activityHeatmap);

    return ui.activityHeatmap === null ? <div>Loading...</div> : (
        <div className='activity-graph-wrapper'>
            <span className='activity-graph-title'>Activity Tracker: Actions</span>
            <CalendarHeatmap
                startDate={shiftDate(today, numberOfDays)}
                endDate={today}
                values={heatMap}
                gutterSize={4}
                classForValue={(value) => {
                    if (!value) { return "color-empty"; }
                    return `color-gitlab-${value.count >= 4 ? 4 : value.count}`;
                }}
                tooltipDataAttrs={(value) => {
                    return { "data-tip": `${value.date} has count: ${value.count}` };
                }}
                showWeekdayLabels={true}
                weekdayLabels={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
                onClick={(value) =>
                    alert(`Clicked on value with Date and Count: ${value.date} ${value.count}`)
                }
            />
        </div>
    )
}

const getFullHeatMap = (numberOfDays, heatMapData) => {
    const today = new Date();

    let tempHeatMapData = [];
    let heatMapIndex = heatMapData ? heatMapData.length - 1 : -1;
    for (let index = 0; index < numberOfDays; index++) {

        const currentDate = dayjs(shiftDate(today, -index)).format('YYYY-MM-DD');

        let exist = false;
        for (let j = heatMapIndex; j >= 0; j--) {
            const heatMapCurrentDate = heatMapData[j].date;

            if (currentDate === heatMapCurrentDate) {
                tempHeatMapData.push(heatMapData[j]);
                heatMapIndex--;
                exist = true;
                break;
            }
        }

        if (!exist) {
            tempHeatMapData.push({
                date: currentDate,
                count: 0,
            });
        }

    }

    return tempHeatMapData;
}

export default ActivityGraph;
