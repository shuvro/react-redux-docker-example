import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postAdditionalFormData, redirectToUrl } from '../../../actions';
import { Row, Col, Button } from 'react-bootstrap';

class AdditionalSubmitComponent extends Component {
  state = {
  }

  formIsValid = () => {
    return this.props.form.loading ? { disabled: true } : '';
  }

  submitAdditionalForm = (e) => {
    this.props.postAdditionalFormData();
  }

  render() {
    const { config } = this.props;
    const buttonStyle = { background: config.baseColor, borderColor: config.baseColor, width: '100%', marginTop: '40px', marginBottom: '70px' };
    return (
      <div style={{ marginTop: '26vh' }}>
        <h3 style={{ textAlign: 'center' }}>Gracias el proceso se ha completado con éxito.</h3>
        <Row style={{ marginTop: '60px' }}>
          <Col xs={0} md={4}></Col>
          <Col xs={12} md={4}>
            <Button {...this.formIsValid()} onClick={this.submitAdditionalForm} style={buttonStyle} type="submit">Regresar a mi formulario</Button>
          </Col>
          <Col xs={0} md={4}></Col>
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
      postAdditionalFormData,
      redirectToUrl,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalSubmitComponent)
