import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { Form, Row, Col, Navbar, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';
import { _data } from './../scripts/all';

const CasesDateAgeSexProvince = () => {

    const[ gridProps, setGridProps ] = useState({ 
        data: [],
        loading: false,
        pageNr: 1,
        pageSize: 10,
        orderBy: 'date',
        orderDir: 'DESC'
    });

    const loadData = (pageSize, pageNr, orderBy, orderDir) => {
        setGridProps(Object.assign(gridProps, { loading: true }));
        _data.get(
        {
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats?type=CasesDateASP`,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir
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
        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Confirmed Cases - by Date, Agem, Sex and Province</h1>
            <Form className="mb-3">
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="From Date" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="To Date" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Province" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Region" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Age Group" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Sex" />
                    </Col>
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
                <Column sortable header='Province' className='center bold' field='province' />
                <Column sortable header='Region' className='center bold' field='region' />
                <Column sortable header='Age' className='center' field='agegroup' />
                <Column sortable header='Sex' className='center' field='sex' />
                <Column sortable header='Cases' className='center' field='cases' />
            </Grid>
        </>
    );

}

export default CasesDateAgeSexProvince;