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

const CasesDateMunicipality = () => {

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
    const [ language, setLanguage ] = useState('FR');
    const [ regions, setRegions ] = useState([]);
    const [ provinces, setProvinces ] = useState([]);
    const [ districts, setDistricts ] = useState([]);
    const [ cities, setCities ] = useState([]);
    
    // filter values
    const [ filterStartDate, setFilterStartDate ] = useState(moment().subtract(1, 'months').toDate());
    const [ filterEndDate, setFilterEndDate ] = useState("");
    const [ filterProvince, setFilterProvince] = useState(["ALL"]);
    const [ filterRegion, setFilterRegion] = useState(["ALL"])
    const [ filterDistrict, setFilterDistrict ] = useState("ALL");
    const [ filterCity, setFilterCity ] = useState("ALL");

    const [ cookies, setCookie ] = useCookies(['hideGrid']);
    const loadData = (pageSize, pageNr, orderBy, orderDir, loadChartData) => {
        // get grid data
        setLoadingGrid(true);
        _data.get(
        {
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateM`,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            filter: {
                lang: language,
                startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                region: filterRegion,
                province: filterProvince,
                district: filterDistrict,
                city: filterCity
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
                    url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateM`,
                    pageNr: 1,
                    pageSize: 100000000,
                    filter: {
                        lang: language,
                        startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                        endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                        region: filterRegion,
                        province: filterProvince,
                        district: filterDistrict,
                        city: filterCity
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
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateM&lang=${language}&field=region` }, (data) => setRegions(data));
        
        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ language, filterStartDate, filterEndDate, filterRegion, filterProvince, filterDistrict, filterCity ]);

    useEffect(() => {
        _data.get({ 
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateM&lang=${language}&field=province&re=${filterRegion}` 
        }, (data) => setProvinces(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterRegion ]);        

    useEffect(() => {
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateM&lang=${language}&field=district&re=${filterRegion}|${filterProvince}` }, (data) => setDistricts(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterRegion, filterProvince ]);       

    useEffect(() => {
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateM&lang=${language}&field=city&re=${filterRegion}|${filterProvince}|${filterDistrict}` }, (data) => setCities(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterRegion, filterProvince, filterDistrict ]);   

    return (
        <>
            <h1>
                <img 
                    width = "24"
                    alt = {`Flag`}
                    title = {`Current language: ${language}. Click to change!`}
                    src={ `images/${language}_flag.png` }
                    onClick={(e) => { 
                        setLanguage(language === "FR" ? "NL" : "FR");
                        setFilterRegion('ALL');
                        setFilterProvince('ALL');
                        setFilterDistrict('ALL');
                        setFilterCity('ALL');
                    }}
                    style={{ cursor: "pointer" }}
                    className="mx-2 my-2"
                />
                Confirmed Cases - by Date and Municipality
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
                            onChange={(e) => { 
                                setFilterRegion(e.target.value); 
                                setFilterProvince("ALL"); 
                                setFilterDistrict('ALL');
                                setFilterCity('ALL');                                
                                }}>
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
                            onChange={(e) => { 
                                setFilterProvince(e.target.value); 
                                setFilterDistrict('ALL');
                                setFilterCity('ALL');                                
                                }}>
                            <Form.Control as="option" value="ALL">Province</Form.Control>
                            {
                                provinces.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>                        
                    </Col>
                    <Col>
                        <Form.Control 
                            as="select"
                            placeholder="District"
                            onChange={(e) => { 
                                setFilterDistrict(e.target.value); 
                                setFilterCity('ALL');                                
                                }}>
                            <Form.Control as="option" value="ALL">District</Form.Control>
                            {
                                districts.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                    <Form.Control 
                            as="select"
                            placeholder="City"
                            onChange={(e) => setFilterCity(e.target.value)}>
                            <Form.Control as="option" value="ALL">City</Form.Control>
                            {
                                cities.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>
                    </Col>
                </Form.Row>
            </Form>
            {
                (cookies.hideGrid !== "1") &&
                <Grid 
                    { ...gridProps }
                    skin='bootstrap'
                    loading={loadingGrid}
                    onStateChange={newState => loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir, false)}
                    > 
                    <Column sortable header='Date' className='bold' field='date' />
                    <Column sortable header='NIS5' className='center bold' field='niS5' />
                    <Column sortable header='Region' field={`tX_RGN_DESCR_${language}`} />
                    <Column sortable header='Province' field={`tX_PROV_DESCR_${language}`} />
                    <Column sortable header='District' field={`tX_ADM_DSTR_DESCR_${language}`} />
                    <Column sortable header='City' field={`tX_DESCR_${language}`} />
                    <Column sortable header='Cases' className='center bold' field='cases' />
                </Grid>
            }
            <StatsChart
                type="CasesDateM"
                loading={loadingChart}
                filter={{
                    lang: language,
                    startDate: filterStartDate,
                    endDate: filterEndDate,
                    region: filterRegion,
                    province: filterProvince,
                    district: filterDistrict,
                    city: filterCity
                }}
                data={chartData}
             />
        </>
    );

}

export default CasesDateMunicipality;