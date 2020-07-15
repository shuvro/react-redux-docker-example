import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getFormData, redirectToUrl } from '../../actions'
import { Row, Col, Button, Modal } from 'react-bootstrap';
// import { InputField } from '../fields';
import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

class DecisionComponent extends Component {
  state = {
    blocks: [],
    form: {},
    showModal: false
  }

  gotoStep = (e, step) => {
    this.props.redirectToUrl(step);
  }

  render() {
    const { showModal } = this.state;
    const { config } = this.props;
    const baseColor = { color: config.baseColor };
    return (
      <div>
        <div className='form-div'>
          <h4 style={baseColor} className='form-block-title' > Actualizar firmantes </h4>
        </div>

        <Row className="light-warning-section" style={{ marginTop: '42px' }}>
          <Col xs={12} >
            {/*<p className='light-warning-text' >
              <strong>Los firmantes son representantes que pueden firmar por usted, lorem ipsum, etc</strong>
            </p>*/}
          </Col>
        </Row>

        <Row style={{ marginTop: '40px', marginBottom: '70px' }}>
          <Col xs={0} md={6}></Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={6} >
                <Button variant="outline-secondary" onClick={e => this.gotoStep(e, ROUTES.FORM8)} style={{ width: '95%' }}>Continuar</Button>
              </Col>
              <Col xs={6} >
                <Button onClick={e => this.gotoStep(e, ROUTES.SIGNERS)} style={{ background: config.baseColor, borderColor: config.baseColor, width: '95%', float: 'right' }}>Actualizar</Button>
                {/*<Button onClick={e => this.gotoStep(e, ROUTES.ENTRYLIST)} style={{ background: config.baseColor, borderColor: config.baseColor, width: '95%', float: 'right' }}>*/}
                {/*  <Link className="custom-a-tag" target="_blank" to={ROUTES.A_FORM1}>Si, deseo.</Link>*/}
                {/*</Button>*/}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ config, form }) => ({
  config, form
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFormData,
      redirectToUrl,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionComponent)
