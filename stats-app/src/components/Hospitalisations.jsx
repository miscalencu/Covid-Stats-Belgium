import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { Form, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { _data } from '../scripts/all';
import moment from 'moment';

const Hospitalisations = () => {

    const[ gridProps, setGridProps ] = useState({ 
        data: [],
        loading: true,
        pageNr: 1,
        pageSize: 10,
        orderBy: 'date',
        orderDir: 'DESC'
    });

    // filter data
    const [ regions, setRegions ] = useState([]);
    const [ provinces, setProvinces ] = useState([]);
    
    // filter values
    const [ filterProvince, setFilterProvince] = useState(["ALL"]);
    const [ filterRegion, setFilterRegion] = useState(["ALL"])
    const [ filterStartDate, setFilterStartDate ] = useState("");
    const [ filterEndDate, setFilterEndDate ] = useState("");

    const loadData = (pageSize, pageNr, orderBy, orderDir) => {
        setGridProps(Object.assign(gridProps, { loading: true }));
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
      }
    

    useEffect(() => {
        // set filter items
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateHosp&field=region` }, (data) => setRegions(data));
        
        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir);
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
            <h1>Confirmed Cases - Hospitalisations</h1>
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
            <Grid 
                { ...gridProps }
                skin='bootstrap'
                onStateChange={newState =>
                    loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir)
                }
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
        </>
    );

}

export default Hospitalisations;