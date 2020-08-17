import React from 'react';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { _data } from './../scripts/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const StatsChart = (props) => {

    if(!props.data || props.data.length === 0)
        return (props.loading === true) ? (
            <>
                <FontAwesomeIcon icon={faSync} className='fa-spin mr-2' />
                Please wait. Loading chart data...
            </>
        )
        : "No records available.";

    let chartDates = [];
    let chartSeriesInfo = [];
    let data = _data.sort(props.data.filter(i => i.date), "date", "ASC");
    let startDate = moment(data[0].date);
    let endDate = moment(data[data.length - 1].date);

    for (var m = startDate; m.isSameOrBefore(endDate); m.add(1, 'days')) {
        chartDates.push(m.format('YYYY-MM-DD'));
    }

    switch(props.type) {
        case "CasesDateASP":
            chartSeriesInfo = [
                { label: "Cases", field: "cases", visible: true }
            ];
            break;
        case "CasesDateM":
            chartSeriesInfo = [
                { label: "Cases", field: "cases", visible: true }
            ];
            break;
        case "CasesDateHosp":
            chartSeriesInfo = [
                { label: "Reporting", field: "nR_REPORTING", visible: !props.homepage },
                { label: "SICK", field: "totaL_IN", visible: !props.homepage },
                { label: "ICU", field: "totaL_IN_ICU", visible: !props.homepage },
                { label: "RESP", field: "totaL_IN_RESP", visible: !props.homepage },
                { label: "ECMO", field: "totaL_IN_ECMO", visible: !props.homepage },
                { label: "HOSP IN", field: "neW_IN", visible: true },
                { label: "HOSP OUT", field: "neW_OUT", visible: true }
            ];
            break;   
        case "CasesDateMort":
            chartSeriesInfo = [
                { label: "Deaths", field: "deaths", visible: true }
            ];
            break;           
        case "CasesDateTests":
            chartSeriesInfo = [
                { label: "Tests", field: "testS_ALL", visible: true }
            ];
            break;                           
        default:
            break;
    }

    const buildChartSeries = () => {
        let chartSeries = [];
        chartSeriesInfo.forEach(info => {
            let seriesValues = [];
            chartDates.forEach(date => {
                let total = data.filter(i => i.date === date).reduce((a, b) => a + (parseInt(b[info.field].replace("<5", "2.5")) || 0), 0);
                seriesValues.push(total);
            });

            chartSeries.push({ 
                type: 'line',
                lineWidth: 5,
                name: info.label,
                label: {
                    enabled: true
                },
                data: seriesValues,
                visible: info.visible
            });
        });
        return chartSeries;
    };

    let chartOptions = {
    title: {
        text: (props.homepage === true) ? "Entire Belgium - patients hospitalised IN vs. OUT in the last month" : ""
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            }
        }
    },
    xAxis: {
        title:{
            text:"Days"
        },
        categories: chartDates
    },
    yAxis: {
        title:{
            text:"Number of people"
        }
    },
    series: buildChartSeries()
    };

    return(
        <div style={{ position: 'relative' }}>
            { props.loading && <FontAwesomeIcon icon={faSync} className='fa-spin mr-2' style={{ position: 'absolute', zIndex: 100, top: 10, left: 10, color: '#c00' }} /> }
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
}

StatsChart.defaultProps = {
    homepage: false,
    loading: false
}

export default StatsChart;