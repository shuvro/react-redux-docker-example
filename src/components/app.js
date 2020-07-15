import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ROUTES from '../utils/routes';
import { IMAGE_ENDPOINT } from '../utils/api';
import PrivateRoute from './privateRoute';
import { Loader, Toastr } from './common';
import * as Common from './common';
import * as Main from './main';
import { getGlobalConfig, checkStorageLoginCred } from '../actions';
import { Container, Row, Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {

  state = {
    appStyle: null,
    headerStyle: null,
    headperImg: null,
    headperTitle: null,
  }

  componentDidMount() {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      event.returnValue = '';
      localStorage.removeItem('loginToken');
      localStorage.removeItem('otpToken');
      localStorage.removeItem('tokenExpiredAt');
      localStorage.removeItem('loginRefreshToken');
      localStorage.removeItem('token');
      localStorage.removeItem('primaryRepresentative');
    });
  }
  componentWillMount() {
    if (!this.props.config.form) {
      this.props.getGlobalConfig()
    }
    this.props.checkStorageLoginCred();
  }

  componentDidUpdate() {
    if (!this.state.appStyle && this.props.config.form) {
      const form = this.props.config.form;
      this.setState({
        headperImg: IMAGE_ENDPOINT + '/' + form.marketing.logo,
        headperTitle: form.marketing.header,
        appStyle: { fontFamily: form.marketing.style['font-family'] },
        headerStyle: { background: form.marketing.style['base-color'], color: form.marketing.style['primary-color'], maxHeight: '77px' }
      }
      );
    }
  }

  render() {
    const { config, auth, form } = this.props;
    const loading = config.loading || auth.loading || form.loading;
    let appStyle = this.state.appStyle;
    if (!this.state.appStyle) {
      appStyle = { opacity: '0' }
    }
    if (config.form === null) {
      return (
        <React.Fragment>
          <Loader loading={true} color="#fff" />
          <Route exact path={ROUTES.ERROR} component={Common.ErrorComponent} />
        </React.Fragment>
        )

    } else {
      return (
        <React.Fragment>
          <div style={appStyle}>
            <header>
              <div style={this.state.headerStyle}>
                <Container>
                  <Row>
                    <Col xs={12} md={8}>
                      <img src={this.state.headperImg} alt='logo' className='header-logo' />
                    </Col>
                    <Col xs={12} md={4} className='header-title-div'>
                      <span className='header-title'>{this.state.headperTitle}</span>
                    </Col>
                  </Row>
                </Container>
              </div>
            </header>

            <Container>
              <Switch>
                <Route exact path={ROUTES.LOG_IN} component={Common.LogIn} />
                <Route exact path={ROUTES.COMPANY} component={Common.Company} />
                <Route exact path={ROUTES.OTP} component={Common.OTPForm} />
                <Route exact path={ROUTES.ERROR} component={Common.ErrorComponent} />

                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM1} component={Main.Form1Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM2} component={Main.Form2Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM3} component={Main.Form3Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM4} component={Main.Form4Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM5} component={Main.Form5Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM6} component={Main.Form6Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM7} component={Main.Form7Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.FORM8} component={Main.Form8Component} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.DONE} component={Main.DoneComponent} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.DECISION} component={Main.DecisionComponent} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.ENTRYLIST} component={Main.EntryListComponent} />
                <PrivateRoute auth={this.props.auth} path={ROUTES.PARTNERS + "/:partnerId"} component={Main.Partners5Component} />

                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_FORM1} component={Main.AdditionalForm1Component} />*/}
                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_FORM2} component={Main.AdditionalForm2Component} />*/}
                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_FORM3} component={Main.AdditionalForm3Component} />*/}
                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_FORM4} component={Main.AdditionalForm4Component} />*/}
                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_FORM5} component={Main.AdditionalForm5Component} />*/}
                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_FORM6} component={Main.AdditionalForm6Component} />*/}
                {/*<PrivateRoute auth={this.props.auth} path={ROUTES.A_SUBMIT} component={Main.AdditionalSubmitComponent} />*/}
                <PrivateRoute auth={this.props.auth} path={ROUTES.SIGNERS} component={Main.SignersFormComponent} />

                <Redirect to={ROUTES.LOG_IN} />
              </Switch>
            </Container>

          </div>
          <Loader loading={loading} color={config.form.marketing.style['base-color']} />
          <Toastr />
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = ({ config, auth, form }) => ({
  config, auth, form
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGlobalConfig,
      checkStorageLoginCred,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(App);
