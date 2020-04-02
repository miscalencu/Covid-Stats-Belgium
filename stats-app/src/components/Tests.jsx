import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { Form, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { _data } from '../scripts/all';
import moment from 'moment';
import StatsChart from './StatsChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

const CasesDateAgeSexProvince = () => {

    const[ gridProps, setGridProps ] = useState({ 
        data: [],
        loading: true,
        pageNr: 1,
        pageSize: 10,
        orderBy: 'date',
        orderDir: 'DESC'
    });
    const [ chartData, setChartData ] = useState([]);

    // filter values
    const [ filterStartDate, setFilterStartDate ] = useState(moment().subtract(1, 'months').toDate());
    const [ filterEndDate, setFilterEndDate ] = useState("");

    const [ cookies, setCookie ] = useCookies(['hideGrid']);
    const loadData = (pageSize, pageNr, orderBy, orderDir) => {
        setGridProps(Object.assign(gridProps, { loading: true }));
        // get grid data
        _data.get(
        {
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateTests`,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            filter: {
                startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
            },
        }, (data, count) => {
          setGridProps({
            loading: false,
            data: data,
            dataCount: count,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            emptyPlaceholder: '-'
          })
        });
        // get chart data
        _data.get(
            {
                url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateTests`,
                pageNr: 1,
                pageSize: 10000000,
                filter: {
                    startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                    endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                },
            }, (data) => setChartData(data));
      }

    useEffect(() => {
        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterStartDate, filterEndDate ]);   

    return (
        <>
            <h1>
                Total Tests
                <Button 
                    variant={ cookies.hideGrid === "1" ? 'primary': 'light' } 
                    className="m-1" 
                    size="sm" 
                    onClick={() => {
                        setCookie('hideGrid', cookies.hideGrid !== "1" ? "1": "0");
                    }}
                    title={ cookies.hideGrid === "1" ? 'Show grid': 'View chart only' }>
                    <FontAwesomeIcon icon={ faChartLine } />
                </Button>
            </h1>
            <Form className="mb-3">
                <Form.Row>
                    <Col>
                        <DatePicker
                            selectsStart
                            startDate={filterStartDate}
                            endDate={filterEndDate}
                            placeholderText="From Date"
                            className="form-control"
                            selected={filterStartDate}
                            onChange={date => setFilterStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            isClearable
                         />
                    </Col>
                    <Col>
                    <DatePicker
                            selectsEnd
                            startDate={filterStartDate}
                            endDate={filterEndDate}
                            placeholderText="To Date"
                            className="form-control"
                            selected={filterEndDate}
                            onChange={date => setFilterEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            isClearable
                         />
                    </Col>
                    <Col md={8}></Col>
                </Form.Row>
            </Form>
            {
                (cookies.hideGrid !== "1") &&
                <Grid 
                    { ...gridProps }
                    skin='bootstrap'
                    onStateChange={newState =>
                        loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir)
                    }
                    > 
                    <Column sortable header='Date' className='italic' field='date' />
                    <Column sortable header='Tests' className='center' field='tests' />
                </Grid>
            }
            <StatsChart
                type="CasesDateTests"
                filter={{
                    startDate: filterStartDate,
                    endDate: filterEndDate
                }}
                data={chartData}
             />
        </>
    );

}

export default CasesDateAgeSexProvince;