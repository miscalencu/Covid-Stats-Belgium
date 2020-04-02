import React from 'react';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { _data } from './../scripts/all';

const StatsChart = (props) => {

    if(!props.data || props.data.length === 0)
        return "No records yet.";

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
                { label: "Cases", field: "cases" }
            ];
            break;
        case "CasesDateM":
            chartSeriesInfo = [
                { label: "Cases", field: "cases" }
            ];
            break;
        case "CasesDateHosp":
            chartSeriesInfo = [
                { label: "Reporting", field: "nR_REPORTING" },
                { label: "IN", field: "totaL_IN" },
                { label: "ICU", field: "totaL_IN_ICU" },
                { label: "RESP", field: "totaL_IN_RESP" },
                { label: "ECMO", field: "totaL_IN_ECMO" },
                { label: "NEW IN", field: "neW_IN" },
                { label: "NEW OUT", field: "neW_OUT" }
            ];
            break;   
        case "CasesDateMort":
            chartSeriesInfo = [
                { label: "Deaths", field: "deaths" }
            ];
            break;           
        case "CasesDateTests":
            chartSeriesInfo = [
                { label: "Tests", field: "tests" }
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
                data: seriesValues
            });
        });
        return chartSeries;
    };

    let chartOptions = {
    title: {
        text: ""
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
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    );
}

export default StatsChart;