import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getFormData, redirectToUrl, doLogout } from '../../actions'
import { Row, Col, Form, Button } from 'react-bootstrap';
// import { InputField } from '../fields';
import ROUTES from '../../utils/routes';

class DoneComponent extends Component {
  STEP = 8;
  state = {
    blocks: [],
    form: {},
  }

  componentWillMount() {
    // if (this.props.form[this.STEP].length == 0) {
    //   this.props.getFormData({ step: this.STEP })
    // } else {
    //   this.updateState();
    // }
  }

  componentWillReceiveProps() {
    // this.updateState();
  }

  updateState = () => {
    if (this.state.blocks.length === 0 && this.props.form[this.STEP]) {
      const blocks = this.props.form[this.STEP];
      let form = {};
      blocks.forEach(item => {
        item.block.fields.forEach(field => {
          form[field.name] = field.initialValue;
        })
      })

      this.setState({ blocks, form });
    }
  }

  onChange = (e, name) => {
    let { form } = this.state
    // switch (validation) {
    //   case '_num_only':
    //     if (isNaN(e.target.value)) {
    //       e.target.value = form[name];
    //       return;
    //     }
    //     break;

    //   default:
    //     break;
    // }
    form[name] = e.target.value.trim();
    this.setState({ form });
  }

  formIsValid = () => {
    const { form } = this.state;
    return this.props.form.loading || this.state.fields.find(field => field.isRequired && form[field.name].toString().length < 1) ? { disabled: true } : '';
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.form);
    // this.props.redirectToUrl(ROUTES.);
    // this.props.postOTPForm(this.state.form);
  }

  gotoStep = (e, step) => {
    this.props.redirectToUrl(step);
  }
  logMeOut = () => {
    this.props.doLogout();
  }


  render() {
    const { config } = this.props;
    const baseColor = { color: config.baseColor };
    const buttonStyle = {
      background: config.baseColor,
      borderColor: config.baseColor,
      width: '100%',
      marginTop: '80px',
      // marginBottom: '70px'
    }
    return (
      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <h1 className='done-page-header'>Gracias el proceso se ha completado con éxito.</h1>
        <div>
          <svg style={{ marginTop: '70px' }} xmlns="http://www.w3.org/2000/svg" width="268" height="268" viewBox="0 0 268 268"><defs><clipPath id="31k5a"><path fill="#fff" d="M0 134C0 59.994 59.994 0 134 0s134 59.994 134 134-59.994 134-134 134S0 208.006 0 134z" /></clipPath></defs><g><g><path fill="none" stroke="#599f59" strokeMiterlimit="50" strokeWidth="10" d="M0 134C0 59.994 59.994 0 134 0s134 59.994 134 134-59.994 134-134 134S0 208.006 0 134z" clipPath="url(&quot;#31k5a&quot;)" /></g><g><path fill="#599f59" d="M116.21 165.54l-27.158-27.157L80 147.435l36.21 36.21 77.593-77.593L184.75 97z" /></g></g></svg>
        </div>
        <Row>
          <Col xs={0} md={4}/>
          <Col xs={12} md={4}>
            <Button onClick={e => this.logMeOut()} style={buttonStyle} type="submit">Completo</Button>
          </Col>
          <Col xs={0} md={4}/>
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
      doLogout
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoneComponent)
