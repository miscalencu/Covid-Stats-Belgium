import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { Form, Col } from 'react-bootstrap';
import { _data } from '../scripts/all';

const CasesDateMunicipalityCum = () => {

    const[ gridProps, setGridProps ] = useState({ 
        data: [],
        pageNr: 1,
        pageSize: 10,
        orderBy: 'date',
        orderDir: 'DESC'
    });
    const [ loadingGrid, setLoadingGrid ] = useState(true);

    // filter data
    const [ language, setLanguage ] = useState('FR');
    const [ regions, setRegions ] = useState([]);
    const [ provinces, setProvinces ] = useState([]);
    const [ districts, setDistricts ] = useState([]);
    const [ cities, setCities ] = useState([]);
    
    // filter values
    const [ filterProvince, setFilterProvince] = useState(["ALL"]);
    const [ filterRegion, setFilterRegion] = useState(["ALL"])
    const [ filterDistrict, setFilterDistrict ] = useState("ALL");
    const [ filterCity, setFilterCity ] = useState("ALL");

    const loadData = (pageSize, pageNr, orderBy, orderDir) => {
        setLoadingGrid(true);
        _data.get(
        {
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetCasesDateMCum`,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            filter: {
                lang: language,
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
      }
    

    useEffect(() => {
        // set filter items
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateCumM&lang=${language}&field=region` }, (data) => setRegions(data));
        
        loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ language, filterRegion, filterProvince, filterDistrict, filterCity ]);

    useEffect(() => {
        _data.get({ 
            url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateCumM&lang=${language}&field=province&re=${filterRegion}` 
        }, (data) => setProvinces(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterRegion ]);        

    useEffect(() => {
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateCumM&lang=${language}&field=district&re=${filterRegion}|${filterProvince}` }, (data) => setDistricts(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filterRegion, filterProvince ]);       

    useEffect(() => {
        _data.get({ url: `${process.env.REACT_APP_API_ROOT_URL}/Stats/GetFilterData?type=CasesDateCumM&lang=${language}&field=city&re=${filterRegion}|${filterProvince}|${filterDistrict}` }, (data) => setCities(data));
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
                Confirmed Cases - Cumulative Number by Municipality
            </h1>
            <Form className="mb-3">
                <Form.Row>
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
            <Grid 
                { ...gridProps }
                skin='bootstrap'
                loading={loadingGrid}
                onStateChange={newState =>
                    loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir)
                }
                > 
                <Column sortable header='NIS5' className='center bold' field='niS5' />
                <Column sortable header='Region' field={`tX_RGN_DESCR_${language}`} />
                <Column sortable header='Province' field={`tX_PROV_DESCR_${language}`} />
                <Column sortable header='District' field={`tX_ADM_DSTR_DESCR_${language}`} />
                <Column sortable header='City' field={`tX_DESCR_${language}`} />
                <Column sortable header='Cases' className='center bold' field='cases' />
            </Grid>
        </>
    );

}

export default CasesDateMunicipalityCum;