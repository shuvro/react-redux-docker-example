import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {postLoginInfo, isLoggedInAndRedirect, redirectToLogin, getRepresentativeList } from '../../actions'
import { InputField, SelectField } from '../fields'
import language from '../../constants/error-msg-definitions'

class Company extends Component {

  state = {
    form: {},
    requiredFields: [],
    fieldsError: {}
  }

  componentWillMount() {
    this.props.isLoggedInAndRedirect();
    if (!this.props.auth.loginToken) {
      this.props.redirectToLogin();
    }
    if (!this.props.auth.company) {
      this.props.getRepresentativeList();
    } else {
      this.updateStateForm();
    }
  }
  componentWillReceiveProps() {
    if (this.state.form.length === 0) {
      this.updateStateForm()
    }
  }
  componentDidUpdate() {
    if (Object.keys(this.state.form).length === 0) {
      this.updateStateForm();
    }
  }

  updateStateForm = () => {
    if (this.props.auth.company !== null) {
      let form = {};
      let requiredFields = [];
      let fieldsError = {};
      const atrributes = this.props.auth.company;
      atrributes.forEach(blocks => {
        blocks.block.fields.forEach(field => {
          form[field.name] = ['switch', 'checkbox'].includes(field.type.toLowerCase()) ? field.isSelected : field.initialValue;
          fieldsError[field.name] = {
            status: false,
            message: '',
            field: field
          }
        })
      })
      this.setState({ form, fieldsError });
    }
  }

  onChange = (e, name, type, validation,blockIndex = 0, mask = "") => {
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
      let speacialCharsFormatWithSpace = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
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
          if (mask === "money") {
            speacialCharsFormatWithSpace = /[ !@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/;
          } else if (mask === "euro") {
            speacialCharsFormatWithSpace = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
          }
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
      form[name] = e.target.value.trim()
    }
    this.setState({ form })
  }

  formIsValid = () => {
    const { form } = this.state
    // return this.props.auth.loading || this.state.requiredFields.find(field => form[field].toString().length < 1) ? { disabled: true } : '';

    return this.props.auth.loading ? { disabled: true } : ''
  }

  submitForm = (e) => {
    e.preventDefault();
    let valid = true;
    let { fieldsError, form } = this.state;
    const { config } = this.props;
    const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    Object.keys(fieldsError).forEach(fe => {
      if (document.getElementById(fieldsError[fe].field.name)) {
        fieldsError[fe].status = false;
        fieldsError[fe].warn = false;
        fieldsError[fe].message = '';
        if (fieldsError[fe].field.isRequired && form[fe].toString().length === 0) {
          valid = false;
          fieldsError[fe].status = true;
          fieldsError[fe].message = language[config.form.settings.lang].required;
        } else if (fieldsError[fe].field.validation && fieldsError[fe].field.validation.toLowerCase() === 'email' &&
          form[fe].length > 0 && !emailValidator.test(form[fe].toString())) {
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
      }
    });

    if (!valid) {
      this.setState({ fieldsError })
    } else {
      this.props.postLoginInfo(form)
    }
  }

  render() {
    const { config, auth } = this.props
    const { fieldsError } = this.state
    if (auth.company === null || Object.keys(fieldsError).length === 0) {
      return <div></div>
    } else {
      const atrributes = auth.company
      const baseColor = { color: config.baseColor }
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
                      <Col xs={12}>
                        <h4 style={baseColor} className='form-block-title'> {atrribute.block.name} </h4>
                      </Col>
                      }
                      {atrribute.block.fields.map((field, fieldIndex) => {
                        switch (field.type) {
                          case 'text':
                            return <InputField {...field} key={fieldIndex} onChange={this.onChange}
                                               error={fieldsError[field.name]} display='show'
                                               lang={config.form.settings.lang}
                                                />
                          case 'SELECTLIST':
                            return <SelectField {...field} key={fieldIndex} onChange={this.onChange}
                                                error={fieldsError[field.name]} display='show'
                                                lang={config.form.settings.lang}/>
                          default:
                            return <InputField {...field} key={fieldIndex} onChange={this.onChange}
                                               error={fieldsError[field.name]} display='show'
                                               lang={config.form.settings.lang}
                                               />
                        }
                      })
                      }
                      <Col xs={12}>
                        <Button {...this.formIsValid()}
                                style={{ background: config.baseColor, borderColor: config.baseColor, width: '100%' }}
                                type="submit">Continuar</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col xs={1} md={3}></Col>
              </Row>
            )
          })}
        </div>
      )
    }
  }

}


const mapStateToProps = ({ config, auth }) => ({
  config, auth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postLoginInfo,
      isLoggedInAndRedirect,
      getRepresentativeList,
      redirectToLogin
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Company)