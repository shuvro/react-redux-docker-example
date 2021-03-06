import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getFormData,
  postFormData,
  updateFormFieldValue,
  redirectToUrl,
  autoPostFormData,
  deleteImage,
  cloneCurrency,
  removeClonedCurrency
} from '../../actions'
import { Row, Col, Form, Button } from 'react-bootstrap'
import ROUTES from '../../utils/routes'
import {
  InputField,
  SelectField,
  TextAreaField,
  SwitchField,
  CheckboxField,
  UploadField,
  SignaturePadField,
  DateField,
  ButtonField
} from '../fields'
import ReactHtmlParser from 'react-html-parser'
import language from '../../constants/error-msg-definitions'

class Form5Component extends Component {
  STEP = 5
  state = {
    blocks: [],
    form: {},
    fieldsError: {},
    autoSaveInterval: null
  }

  componentWillMount() {
    if (this.props.form[this.STEP].length == 0) {
      this.props.getFormData({ step: this.STEP })
    } else {
      this.updateStateForm()
    }
  }

  componentWillReceiveProps() {
    if (Object.keys(this.state.form).length === 0) {
      this.updateStateForm()
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.autoSaveInterval)
  }

  updateStateForm = () => {
    if (this.props.form[this.STEP]) {
      let form = {}
      let fieldsError = {}
      const atrributes = this.props.form[this.STEP]
      if (atrributes[0]) {
        atrributes.forEach(blocks => {
          if (blocks.block && blocks.block.fields) {
            blocks.block.fields.forEach(field => {
              form[field.name] = ['switch', 'checkbox'].includes(field.type.toLowerCase()) ? field.isSelected : field.initialValue
              fieldsError[field.name] = {
                status: false,
                message: '',
                field: field,
                warn: true
              }
            })
          }
        })
      }
      this.setState({ form, fieldsError })

      // auto save
      const config = this.props.config
      if (config.form && config.form.settings && config.form.settings.autosave && config.form.settings.autosave.toString() == 'true' && !this.state.autoSaveInterval) {
        this.state.autoSaveInterval = setInterval(() => {
          this.props.autoPostFormData({ form: this.state.form, step: this.STEP })
        }, 30000)
      }

    }
  }

  onChange = (e, name, type, validation, blockIndex = 0, mask = '') => {
    let { form, fieldsError } = this.state
    if (['switch', 'checkbox'].includes(type.toLowerCase())) {
      form[name] = e.target.checked
    } else if (type.toLowerCase() === 'upload') {
      if (e.target.files[0] === undefined) {
        form[name] = ''
      } else {
        form[name] = e.target.files[0]
      }
    } else if (type.toLowerCase() === 'date') {
      form[name] = e
    } else if (type.toLowerCase() === 'signaturepad') {
      form[name] = e // send signature image data as e
    } else {
      const speacialCharsFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
      let speacialCharsFormatWithSpace = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
      const numberFormat = /\d/
      const letters = /[A-Za-z]/
      switch (validation) {
        case 'alpha_only':
          if (numberFormat.test(e.target.value) || speacialCharsFormatWithSpace.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_only'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'alpha_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_spaces'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'alpha_only_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_only_spaces'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'alpha_numeric_space':
          if (speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_numeric_space'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'numbers_only':
          if (mask === 'money') {
            speacialCharsFormatWithSpace = /[ !@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/
          } else if (mask === 'euro') {
            speacialCharsFormatWithSpace = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
          }
          if (letters.test(e.target.value) || speacialCharsFormatWithSpace.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts numbers_only'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'text_and_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts text_and_spaces'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'text_only':
          if (speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts text_only'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'email':
          if (/[ ]/.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts email'
            fieldsError[name].status = true
            this.setState({ fieldsError })
            return
          } else fieldsError[name].status = false
          break
        case 'free_text':
          break

        default:
          break
      }
      form[name] = e.target.value.trim()
    }
    fieldsError[name].warn = false
    fieldsError[name].status = false
    this.state.form = form
    this.state.fieldsError = fieldsError
    this.props.updateFormFieldValue({ step: this.STEP, field: name, type, value: form[name] })
  }

  formIsValid = () => {
    return this.props.form.loading ? { disabled: true } : ''
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    let valid = true
    let { fieldsError, form } = this.state
    const { config } = this.props
    const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    Object.keys(fieldsError).forEach(fe => {
      if (document.getElementById(fieldsError[fe].field.name)) {
        fieldsError[fe].status = false
        fieldsError[fe].warn = false
        fieldsError[fe].message = ''
        if (fieldsError[fe].field.isRequired && form[fe].toString().length === 0) {
          valid = false
          fieldsError[fe].status = true
          fieldsError[fe].message = language[config.form.settings.lang].required
        } else if (fieldsError[fe].field.validation && fieldsError[fe].field.validation.toLowerCase() === 'email' &&
          form[fe].length > 0 && !emailValidator.test(form[fe].toString())) {
          valid = false
          fieldsError[fe].status = true
          fieldsError[fe].message = language[config.form.settings.lang].email
        } else if (form[fe].toString().length > fieldsError[fe].field.maxLength) {
          valid = false
          fieldsError[fe].status = true
          fieldsError[fe].message = language[config.form.settings.lang].maxLength + ' ' + fieldsError[fe].field.maxLength
        } else if (form[fe].toString().length !== 0 && form[fe].toString().length < fieldsError[fe].field.minLength) {
          valid = false
          fieldsError[fe].status = true
          fieldsError[fe].message = language[config.form.settings.lang].minLength + ' ' + fieldsError[fe].field.minLength
        }
      }
    })

    if (!valid) {
      this.setState({ fieldsError })
    } else {
      this.props.postFormData({ form: this.state.form, step: this.STEP })
    }
  }

  gotoStep = (e, step) => {
    if (this.props.config.form.useNav) {
      this.props.redirectToUrl(step)
    }
  }
  cloneCurrencyTrigger = (bIndex) => {
    this.props.cloneCurrency({ stepIndex: this.STEP, bIndex: bIndex })
  }
  removeClonedCurrencyTrigger = (bIndex, fieldIndex) => {
    this.props.removeClonedCurrency({ stepIndex: this.STEP, bIndex: bIndex, fieldIndex: fieldIndex })
  }

  render() {
    const { config, form } = this.props
    const { fieldsError } = this.state
    if (form[this.STEP].length === 0 || Object.keys(fieldsError).length === 0) {
      return <div></div>
    } else {
      const blocks = form[this.STEP]
      const baseColor = { color: config.baseColor }
      const buttonStyle = {
        background: config.baseColor,
        borderColor: config.baseColor,
        width: '100%',
        marginTop: '40px',
        marginBottom: '70px'
      }
      if (config.form.showNavigation) {
        setTimeout(() => {
          let styleElemBefore = document.head.appendChild(document.createElement('style'))
          styleElemBefore.innerHTML = `.multi-steps .is-active:before {background: ${config.baseColor}; border-color: ${config.baseColor};}`
          let styleElemAfter = document.head.appendChild(document.createElement('style'))
          styleElemAfter.innerHTML = `.multi-steps .is-active:after {background-color: ${config.baseColor} !important;}`
        }, 30)
      }
      return (
        <div>
          {config.form.showNavigation &&
          <div className="progress-block">
            <ul className="list-unstyled multi-steps">
              {/*<li onClick={e => this.gotoStep(e, ROUTES.FORM1)} ></li>*/}
              {/*<li onClick={e => this.gotoStep(e, ROUTES.FORM2)} ></li>*/}
              {/*<li onClick={e => this.gotoStep(e, ROUTES.FORM3)} ></li>*/}
              {/*<li onClick={e => this.gotoStep(e, ROUTES.FORM4)} ></li>*/}
              {/*<li className="is-active" ></li>*/}
              {/*<li onClick={e => this.gotoStep(e, ROUTES.FORM6)} ></li>*/}

              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li className="is-active"></li>
              <li></li>
            </ul>
          </div>
          }

          <Form onSubmit={this.onFormSubmit}>
            {blocks.map((blockItem, bIndex) => {
              if (['hide', 'show'].includes(blockItem.block.display)) {
                if (blockItem.block.trigger) {
                  blockItem.block.display = this.state.form[blockItem.block.trigger] ? 'show' : 'hide'
                } else {
                  blockItem.block.display = 'show'
                }
              } else {
                blockItem.block.display = 'show'
              }
              if (blockItem.block.display === 'show') {
                return (
                  <div className='form-div' key={bIndex}>
                    {bIndex === 0 && !['info', 'warning'].includes(blockItem.block.class) &&
                    <h4 style={baseColor} className='form-block-title'> {blockItem.block.name} </h4>}
                    {bIndex > 0 && !['info', 'warning'].includes(blockItem.block.class) &&
                    <h5 style={baseColor} className='form-block-title'> {blockItem.block.name} </h5>}
                    <Row style={{ borderLeft: `7px solid ${config.baseColor}` }}
                         className={blockItem.block.class === 'info' ? 'light-blue-section' : blockItem.block.class === 'warning' ? 'light-warning-section' : ''}>
                      {blockItem.block.textBlock &&
                      <Col xs={12}>
                        {blockItem.block.textBlock.class == 'warning' &&
                        <p className='warning-text'>{blockItem.block.textBlock.text}</p>}
                        {blockItem.block.textBlock.class == 'none' && <p>{blockItem.block.textBlock.text}</p>}
                      </Col>
                      }
                      {!blockItem.block.textBlock && blockItem.block.class === 'warning' &&
                      <Col xs={12}>
                        <p className='light-warning-text'><strong>{blockItem.block.name}</strong></p>
                      </Col>
                      }
                      {blockItem.block.type === 'html' &&
                      <Col xs={12}>
                        {ReactHtmlParser(blockItem.block.content)}
                      </Col>
                      }

                      {blockItem.block.class === 'info' &&
                      <Col xs={12}><p className='light-blue-text'>{blockItem.block.name}</p></Col>}

                      {blockItem.block.fields && blockItem.block.fields.map((field, fieldIndex) => {
                        if (['hide', 'show'].includes(field.display) && field.action) {
                          field.display = this.state.form[field.action[1]] ? 'show' : 'hide'
                        } else {
                          field.display = 'show'
                        }
                        switch (field.type) {
                          case 'text':
                            return <InputField {...field} key={fieldIndex} onChange={this.onChange}
                                               error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                          case 'date':
                            return <DateField {...field} key={fieldIndex} onChange={this.onChange}
                                              error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                          case 'SELECTLIST':
                            return <SelectField {...field}
                                                key={fieldIndex}
                                                // cloneCurrencyTrigger={this.cloneCurrencyTrigger}
                                                // addNewBtn={fieldIndex === 0}
                                                // blockIndex={bIndex}
                                                // fieldIndex={fieldIndex}
                                                // addRemoveButton={fieldIndex !== 0}
                                                // removeCurrency={this.removeClonedCurrencyTrigger}
                                                onChange={this.onChange}
                                                error={fieldsError[field.name]}
                                                lang={config.form.settings.lang}/>
                          case 'TXTAREA':
                            return <TextAreaField {...field} key={fieldIndex} onChange={this.onChange}
                                                  error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                          case 'SWITCH':
                            return <SwitchField {...field} key={fieldIndex} onChange={this.onChange}
                                                error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                          case 'CHECKBOX':
                            return <CheckboxField {...field} key={fieldIndex} onChange={this.onChange}
                                                  error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                          case 'UPLOAD':
                            return <UploadField {...field} key={fieldIndex} onChange={this.onChange}
                                                error={fieldsError[field.name]} lang={config.form.settings.lang}
                                                remoteUrl={config.form.remoteUrl + config.form.remoteImagePath}
                                                deleteImage={this.props.deleteImage}/>
                          case 'SIGNATUREPAD':
                            return <SignaturePadField {...field} key={fieldIndex} onChange={this.onChange}
                                                      error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                          default:
                            return <InputField {...field} key={fieldIndex} onChange={this.onChange}
                                               error={fieldsError[field.name]} lang={config.form.settings.lang}/>
                        }
                      })
                      }
                    </Row>
                  </div>
                )
              } else {
                return ''
              }
            })
            }
            <Row>
              <Col xs={0} md={8}></Col>
              <Col xs={12} md={4}>
                <Button {...this.formIsValid()} style={buttonStyle} type="submit">Continuar</Button>
              </Col>
            </Row>
          </Form>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ config, form }) => ({
  config, form
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFormData,
      postFormData,
      updateFormFieldValue,
      redirectToUrl,
      autoPostFormData,
      deleteImage,
      cloneCurrency,
      removeClonedCurrency
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form5Component)
