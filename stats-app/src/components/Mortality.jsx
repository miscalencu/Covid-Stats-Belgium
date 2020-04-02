import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { Form, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { _data } from '../scripts/all';
import moment from 'moment';

const Mortality = () => {

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
    const [ ageGroups, setAgeGroups ] = useState([]);
    const [ sexes, setSexes ] = useState([]);
    
    // filter values
    const [ filterRegion, setFilterRegion] = useState(["ALL"])
    const [ filterStartDate, setFilterStartDate ] = useState("");
    const [ filterEndDate, setFilterEndDate ] = useState("");
    const [ filterAgeGroup, setFilterAgeGroup ] = useState("ALL");
    const [ filterSex, setFilterSex ] = useState("ALL");

    const loadData = (pageSize, pageNr, orderBy, orderDir) => {
        setGridProps(Object.assign(gridProps, { loading: true }));
        _data.get(
        {
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateMort`,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            filter: {
                startDate: filterStartDate ? new moment(filterStartDate).format('YYYY-MM-DD') : '',
                endDate: filterEndDate ? new moment(filterEndDate).format('YYYY-MM-DD') : '',
                region: filterRegion,
                ageGroup: filterAgeGroup,
                sex: filterSex
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
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateMort&field=region` }, (data) => setRegions(data));
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateMort&field=ageGroup` }, (data) => setAgeGroups(data));
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateMort&field=sex` }, (data) => setSexes(data));

        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterStartDate, filterEndDate, filterRegion, filterAgeGroup, filterSex ]);

    return (
        <>
            <h1>Confirmed Cases - Mortality</h1>
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
                            onChange={(e) => { setFilterRegion(e.target.value); }}>
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
                            placeholder="Age Group"
                            onChange={(e) => setFilterAgeGroup(e.target.value)}>
                            <Form.Control as="option" value="ALL">Age Group</Form.Control>
                            {
                                ageGroups.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                    <Form.Control 
                            as="select"
                            placeholder="Sex"
                            onChange={(e) => setFilterSex(e.target.value)}>
                            <Form.Control as="option" value="ALL">Sex</Form.Control>
                            {
                                sexes.map(item => {
                                    return <Form.Control as="option" key={item} value={item}>{item}</Form.Control>
                                })
                            }
                        </Form.Control>
                    </Col>
                    <Col md={2}></Col>
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
                <Column sortable header='Age' className='center' field='agegroup' />
                <Column sortable header='Sex' className='center' field='sex' />
                <Column sortable header='Deaths' className='center' field='deaths' />
            </Grid>
        </>
    );

}

export default Mortality;