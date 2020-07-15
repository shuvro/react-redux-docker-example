import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOTPAtrributes, postOTPForm, redirectToLogin, isLoggedInAndRedirect } from '../../actions';
import { InputField } from '../fields';
import language from '../../constants/error-msg-definitions';

class OTPForm extends Component {

  state = {
    form: {},
    requiredFields: [],
    fieldsError: {},
  }

  componentWillMount() {
    this.props.isLoggedInAndRedirect();
    if (!this.props.auth.loginToken) {
      this.props.redirectToLogin();
    }
    if (!this.props.auth.otpAtrributes) {
      this.props.getOTPAtrributes();
    } else {
      this.updateStateForm();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.state.form).length === 0) {
      this.updateStateForm();
    }
  }

  updateStateForm = () => {
    if (this.props.auth.otpAtrributes !== null) {
      let form = {};
      let requiredFields = [];
      let fieldsError = {};
      const atrributes = this.props.auth.otpAtrributes;
      atrributes.forEach(blocks => {
        blocks.block.fields.forEach(field => {
          form[field.name] = '';
          if (field.isRequired) {
            requiredFields.push(field.name);
          }
          fieldsError[field.name] = {
            status: false,
            message: '',
            field: field,
          }
        })
      })
      this.setState({ form, requiredFields, fieldsError });
    }
  }

  onChange = (e, name, type, validation) => {
    let { form, fieldsError } = this.state
    if (['switch', 'checkbox'].includes(type.toLowerCase())) {
      form[name] = e.target.checked;
    } else if (type.toLowerCase() === 'upload') {
      if (e.target.files[0] === undefined) {
        form[name] = '';
      } else {
        form[name] = e.target.files[0];
      }
    } else if (type.toLowerCase() === 'date') {
      form[name] = e;
    } else if (type.toLowerCase() === 'signaturepad') {
      form[name] = e; // send signature image data as e
    } else {
      const speacialCharsFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const speacialCharsFormatWithSpace = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const numberFormat = /\d/;
      const letters = /[A-Za-z]/;
      switch (validation) {
        case 'alpha_only':
          if (numberFormat.test(e.target.value) || speacialCharsFormatWithSpace.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts alpha_only';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'alpha_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts alpha_spaces';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'alpha_only_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts alpha_only_spaces';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'alpha_numeric_space':
          if (speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts alpha_numeric_space';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'numbers_only':
          if (letters.test(e.target.value) || speacialCharsFormatWithSpace.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts numbers_only';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'text_and_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts text_and_spaces';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'text_only':
          if (speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts text_only';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'email':
          if (/[ ]/.test(e.target.value)) {
            e.target.value = form[name];
            fieldsError[name].message = 'Accepts email';
            fieldsError[name].status = true;
            this.setState({ fieldsError });
            return;
          } else fieldsError[name].status = false;
          break;
        case 'free_text':
          break;

        default:
          break;
      }
      form[name] = e.target.value.trim();
    }
    this.setState({ form });
  }

  formIsValid = () => {
    // const { form } = this.state;
    // return this.props.auth.loading || this.state.requiredFields.find(field => form[field].toString().length < 1) ? { disabled: true } : '';
    return this.props.auth.loading ? { disabled: true } : '';
  }

  submitForm = (e) => {
    e.preventDefault();
    let valid = true;
    let { fieldsError, form } = this.state;
    const { config } = this.props;
    const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    Object.keys(fieldsError).forEach(fe => {
      fieldsError[fe].status = false;
      fieldsError[fe].message = '';
      if (fieldsError[fe].field.isRequired && form[fe].toString().length === 0) {
        valid = false;
        fieldsError[fe].status = true;
        fieldsError[fe].message = language[config.form.settings.lang].required;
      } else if (fieldsError[fe].field.validation && fieldsError[fe].field.validation.toLowerCase() === 'email' && !emailValidator.test(form[fe].toString())) {
        valid = false;
        fieldsError[fe].status = true;
        fieldsError[fe].message = language[config.form.settings.lang].email;
      } else if (form[fe].toString().length > fieldsError[fe].field.maxLength) {
        valid = false;
        fieldsError[fe].status = true;
        fieldsError[fe].message = language[config.form.settings.lang].maxLength + ' ' + fieldsError[fe].field.maxLength;
      } else if (form[fe].toString().length !== 0 && form[fe].toString().length < fieldsError[fe].field.minLength) {
        valid = false;
        fieldsError[fe].status = true;
        fieldsError[fe].message = language[config.form.settings.lang].minLength + ' ' + fieldsError[fe].field.minLength;
      }
    });

    if (!valid) {
      this.setState({ fieldsError });
    } else {
      this.props.postOTPForm(form);
    }
  }

  render() {
    const { config, auth } = this.props;
    const { fieldsError } = this.state;
    if (auth.otpAtrributes === null || Object.keys(fieldsError).length === 0) {
      return <div></div>
    } else {
      const atrributes = auth.otpAtrributes;
      const baseColor = { color: config.baseColor };
      return (
        <div className='login-section'>
          {atrributes.map((atrribute, index) => {
            return (
              <Row key={index}>
                <Col xs={1} md={3}></Col>
                <Col>
                  <Form onSubmit={this.submitForm}>
                    <Row>
                      {atrribute.block.name &&
                        <Col xs={12} >
                          <h4 style={baseColor} className='form-block-title' > {atrribute.block.name} </h4>
                        </Col>
                      }
                      {atrribute.block.fields.map((field, fieldIndex) => (
                        <InputField {...field} key={fieldIndex} onChange={this.onChange} error={fieldsError[field.name]} display='show' autoFocus={true} lang={config.form.settings.lang} />
                      ))

                      }
                      <Col xs={12} >
                        <Button {...this.formIsValid()} style={{ background: config.baseColor, borderColor: config.baseColor, width: '100%' }} type="submit">Continuar</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col xs={1} md={3}></Col>
              </Row>
            )
          })}
        </div>
      );
    }
  }
}


const mapStateToProps = ({ config, auth }) => ({
  config, auth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOTPAtrributes,
      postOTPForm,
      redirectToLogin,
      isLoggedInAndRedirect,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(OTPForm);