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

const Hospitalisations = () => {

    const[ gridProps, setGridProps ] = useState({ 
        data: [],
        pageNr: 1,
        pageSize: 10,
        orderBy: 'date',
        orderDir: 'DESC'
    });
    const [ chartData, setChartData ] = useState([]);
    const [ loadingGrid, setLoadingGrid ] = useState(true);
    const [ loadingChart, setLoadingChart ] = useState(true);

    // filter data
    const [ regions, setRegions ] = useState([]);
    const [ provinces, setProvinces ] = useState([]);
    
    // filter values
    const [ filterProvince, setFilterProvince] = useState(["ALL"]);
    const [ filterRegion, setFilterRegion] = useState(["ALL"])
    const [ filterStartDate, setFilterStartDate ] = useState(moment().subtract(1, 'months').toDate());
    const [ filterEndDate, setFilterEndDate ] = useState("");

    const [ cookies, setCookie ] = useCookies(['hideGrid']);
    const loadData = (pageSize, pageNr, orderBy, orderDir, loadChartData) => {
        // set grid data
        setLoadingGrid(true);
        _data.get(
        {
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateHosp`,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            filter: {
                startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                region: filterRegion,
                province: filterProvince
            },
        }, (data, count) => {
          setGridProps({
            data: data,
            dataCount: count,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            emptyPlaceholder: '-'
          });
          setLoadingGrid(false);
        });

        // get chart data
        if(loadChartData) {
            setLoadingChart(true);
            _data.get(
                {
                    url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateHosp`,
                    pageNr: 1,
                    pageSize: 10000000,
                    filter: {
                        startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                        endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                        region: filterRegion,
                        province: filterProvince
                    },
                }, (data) => 
                { 
                    setChartData(data); 
                    setLoadingChart(false);
                });
            }
      }
    

    useEffect(() => {
        // set filter items
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateHosp&field=region` }, (data) => setRegions(data));
        
        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterStartDate, filterEndDate, filterRegion, filterProvince ]);

    useEffect(() => {
        // set filter items
        _data.get({ 
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateASP&field=province&re=${filterRegion}` 
        }, (data) => setProvinces(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterRegion ]);        

    return (
        <>
            <h1>
                Confirmed Cases - Hospitalisations
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
                    <Col>
                        <Form.Control 
                            as="select"
                            placeholder="Region"
                            onChange={(e) => { setFilterRegion(e.target.value); setFilterProvince("ALL"); }}>
                            <Form.Control as="option" value="ALL">Region</Form.Control>
                            {
                                regions.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control 
                            as="select"
                            placeholder="Province"
                            onChange={(e) => setFilterProvince(e.target.value)}>
                            <Form.Control as="option" value="ALL">Province</Form.Control>
                            {
                                provinces.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>                        
                    </Col>
                    <Col md={4}></Col>
                </Form.Row>
            </Form>
            {
                (cookies.hideGrid !== "1") &&
                <Grid 
                    { ...gridProps }
                    loading={loadingGrid}
                    skin='bootstrap'
                    onStateChange={newState => loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir, false) }
                    > 
                    <Column sortable header='Date' className='italic' field='date' />
                    <Column sortable header='Region' className='center bold' field='region' />
                    <Column sortable header='Province' className='center bold' field='province' />
                    <Column sortable header='Reporting' className='center' field='nR_REPORTING' />
                    <Column sortable header='IN' className='center' field='totaL_IN' />
                    <Column sortable header='ICU' className='center' field='totaL_IN_ICU' />
                    <Column sortable header='RESP' className='center' field='totaL_IN_RESP' />
                    <Column sortable header='ECMO' className='center' field='totaL_IN_ECMO' />
                    <Column sortable header='NEW IN' className='center' field='neW_IN' />
                    <Column sortable header='NEW OUT' className='center' field='neW_OUT' />
                </Grid>
            }
            <StatsChart
                type="CasesDateHosp"
                loading={loadingChart}
                filter={{
                    startDate: filterStartDate,
                    endDate: filterEndDate,
                    region: filterRegion,
                    province: filterProvince
                }}
                data={chartData}
             />
        </>
    );

}

export default Hospitalisations;