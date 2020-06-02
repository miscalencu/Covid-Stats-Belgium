import React from 'react';
import './styles/App.css';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import PageLink from './components/common/pageLink';
import NotFound from './components/common/notFound';
import PageRedirect from './components/common/pageRedirect';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CasesDateAgeSexProvince from './components/CasesDateAgeSexProvince'
import CasesDateMunicipality from './components/CasesDateMunicipality'
import CasesDateMunicipalityCum from './components/CasesDateMunicipalityCum'
import Hospitalisations from './components/Hospitalisations'
import Mortality from './components/Mortality'
import Tests from './components/Tests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMapMarked, faMap, faUserNurse, faSkullCrossbones, faVial, faFileExcel } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Container className="app">
      <Row>
        <Col className="p-0">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
              <img src="images/be_flag.png" width="40" className="mr-2" alt="Belgium" />
              Covid-19 - Belgium Stats
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Confirmed cases" id="basic-nav-dropdown">
                  <PageLink className="dropdown-item" to={`/cases_date_asp`}>
                    <FontAwesomeIcon className="mr-2" icon={ faUsers } />
                    By Date, Age, Sex and Province
                  </PageLink>
                  <PageLink className="dropdown-item" to={`/cases_date_mun`}>
                    <FontAwesomeIcon className="mr-2" icon={ faMapMarked } />
                    By Date and Municipality
                  </PageLink>
                  <NavDropdown.Divider />
                  <PageLink className="dropdown-item" to={`/cases_cum_mun`}>
                    <FontAwesomeIcon className="mr-2" icon={ faMap } />
                    Cumulative by municipality
                  </PageLink>
                </NavDropdown>
                <PageLink className="nav-link" to={`/hosp`}>
                    <FontAwesomeIcon className="mr-2" icon={ faUserNurse } />
                    Hospitalisations
                </PageLink>
                <PageLink className="nav-link" to={`/mortality`}>
                  <FontAwesomeIcon className="mr-2" icon={ faSkullCrossbones } />
                  Mortality
                </PageLink>
                <PageLink className="nav-link" to={`/tests`}>
                  <FontAwesomeIcon className="mr-2" icon={ faVial } />
                  Tests
                </PageLink>
              </Nav>
              <Form inline hidden>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col className="py-4">
          <Switch>
            <Route path={`/`} exact component={Home} />
            <Route path={`/cases_date_asp`} component={CasesDateAgeSexProvince} />
            <Route path={`/cases_date_mun`} component={CasesDateMunicipality} />
            <Route path={`/cases_cum_mun`} component={CasesDateMunicipalityCum} />
            <Route path={`/hosp`} component={Hospitalisations} />
            <Route path={`/mortality`} component={Mortality} />
            <Route path={`/tests`} component={Tests} />
            <Route path={`/not-found`} component={NotFound} />
            <PageRedirect to={`/not-found`} />
          </Switch>
        </Col>
      </Row>
      <Row>
        <Col className="footer">
          Source of data: 
          <a href="https://epistat.wiv-isp.be/Covid" rel="noopener noreferrer" target="_blank">
            https://epistat.wiv-isp.be/Covid/
          </a> | Source code: 
          <a href="https://github.com/miscalencu/Covid-Stats-Belgium" rel="noopener noreferrer" taget="_blank">
              https://github.com/miscalencu/Covid-Stats-Belgium
          </a>
          <a className="float-right" href="https://epistat.sciensano.be/Data/COVID19BE.xlsx" rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon className="mr-2" icon={ faFileExcel } />
            Excel Data
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
