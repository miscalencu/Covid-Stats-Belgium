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
                  <PageLink className="dropdown-item" to={`/cases_date_asp`}>By date, age, sex and province</PageLink>
                  <PageLink className="dropdown-item" to={`/cases_date_mun`}>By date and municipality</PageLink>
                  <NavDropdown.Divider />
                  <PageLink className="dropdown-item" to={`/cases_cum_mun`}>Cumulative by municipality</PageLink>
                </NavDropdown>
                <PageLink className="nav-link" to={`/hosp`}>Hospitalisations</PageLink>
                <PageLink className="nav-link" to={`/mortality`}>Mortality</PageLink>
                <PageLink className="nav-link" to={`/tests`}>Tests</PageLink>
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
            <Route path={`/hosp`} component={NotFound} />
            <Route path={`/mortality`} component={NotFound} />
            <Route path={`/not-tests`} component={NotFound} />
            <PageRedirect to={`/not-found`} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
