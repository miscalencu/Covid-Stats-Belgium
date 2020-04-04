import React, { useState, useEffect } from 'react';
import StatsChart from './StatsChart';
import { _data } from '../scripts/all';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const CasesDateAgeSexProvince = () => {

    const [ chartData, setChartData ] = useState([]);
    const [ loadingChart, setLoadingChart ] = useState(true);
    const [ filterStartDate ] = useState(moment().subtract(1, 'months').toDate());
    const [ filterEndDate ] = useState("");

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterStartDate, filterEndDate ]);

    const loadData = () => {
        // get chart data
        setLoadingChart(true);
        _data.get(
            {
                url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateHosp`,
                pageNr: 1,
                pageSize: 10000000,
                filter: {
                    startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                    endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                    region: 'ALL',
                    province: 'ALL'
                },
            }, (data) => 
            { 
                setChartData(data); 
                setLoadingChart(false);
            });
      }

    return (
        <>
            <h1>Welcome</h1>
            <p>This is a mini React/.Net Core WebAPI website to visually display the official Belgium Covid-19 data.</p>   
            <p>Source of data: <a href="https://epistat.wiv-isp.be/Covid/" rel="noopener noreferrer" target="_blank">https://epistat.wiv-isp.be/Covid/</a></p>
            <p>Source code: <a href="https://github.com/miscalencu/Covid-Stats-Belgium" rel="noopener noreferrer" taget="_blank">https://github.com/miscalencu/Covid-Stats-Belgium</a></p>
            <br />
            <p>
                <StatsChart
                    homepage={true}
                    type="CasesDateHosp"
                    loading={loadingChart}
                    filter={{
                        startDate: filterStartDate,
                        endDate: filterEndDate,
                        region: 'ALL',
                        province: 'ALL'
                    }}
                    data={chartData}
                />
            </p>
            <p style={{ color: '#c00', fontWeight: 'bold' }}>
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                Use the top menu to see different reports.
            </p>
        </>
    );

}

export default CasesDateAgeSexProvince;