import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getAdditionalFormData,
  postAdditionalFormData,
  updateAdditionalFormFieldValue,
  redirectToUrl,
  cloneSigner,
  removeSigner
} from '../../../actions'
import { Row, Col, Form, Button } from 'react-bootstrap'
import ROUTES from '../../../utils/routes'
import {
  InputField,
  SelectField,
  TextAreaField,
  SwitchField,
  CheckboxField,
  UploadField,
  SignaturePadField,
  DateField
} from '../../fields'
import ReactHtmlParser from 'react-html-parser'
import language from '../../../constants/error-msg-definitions'
import swal from 'sweetalert';


class SignersFormComponent extends Component {
  STEP = 'new'
  state = {
    blocks: [],
    form: [],
    fieldsError: []
  }

  componentWillMount() {
    if (this.props.form[this.STEP].length === 0) {
      this.props.getAdditionalFormData({ step: this.STEP, additional: true })
    } else {
      this.updateStateForm()
    }
  }

  componentWillReceiveProps() {
    if (this.state.form.length === 0 || (this.props.form[this.STEP].length - 1 !== this.state.form.length)) {
      this.updateStateForm()
    }
  }

  updateStateForm = () => {
    if (this.props.form[this.STEP]) {
      let formList = []
      let fieldsErrorList = []
      const atrributes = this.props.form[this.STEP]
      if (atrributes[0]) {
        atrributes.forEach(blocks => {
          if (blocks.block && blocks.block.fields) {
            let form = {}
            let fieldsError = {}
            blocks.block.fields.forEach(field => {
              form[field.name] = ['switch', 'checkbox'].includes(field.type.toLowerCase()) ? field.isSelected : field.initialValue
              fieldsError[field.name] = {
                status: false,
                message: '',
                field: field,
                warn: true
              }
            })
            formList.push(form)
            fieldsErrorList.push(fieldsError)
          }
        })
      }
      this.setState({ form: formList, fieldsError: fieldsErrorList });
    }
  }

  onChange = (e, name, type, validation, blockIndex = 0, mask = "") => {
    let { form, fieldsError } = this.state
    form = form[blockIndex - 1];
    fieldsError = fieldsError[blockIndex - 1];
    if (['switch', 'checkbox'].includes(type.toLowerCase())) {
      form[name] = e.target.checked;
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
      const speacialCharsFormatWithSpace = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
      const numberFormat = /\d/
      const letters = /[A-Za-z]/
      switch (validation) {
        case 'alpha_only':
          if (numberFormat.test(e.target.value) || speacialCharsFormatWithSpace.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_only'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'alpha_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_spaces'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'alpha_only_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_only_spaces'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'alpha_numeric_space':
          if (speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts alpha_numeric_space'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'numbers_only':
          if (letters.test(e.target.value) || speacialCharsFormatWithSpace.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts numbers_only'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'text_and_spaces':
          if (numberFormat.test(e.target.value) || speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts text_and_spaces'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'text_only':
          if (speacialCharsFormat.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts text_only'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
            return
          } else fieldsError[name].status = false
          break
        case 'email':
          if (/[ ]/.test(e.target.value)) {
            e.target.value = form[name]
            fieldsError[name].message = 'Accepts email'
            fieldsError[name].status = true
            let tempErr = this.state.fieldsError;
            tempErr[blockIndex - 1] = fieldsError;
            this.setState({ fieldsError: tempErr })
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
    this.state.form[blockIndex - 1] = form
    this.state.fieldsError[blockIndex - 1] = fieldsError
    this.props.updateAdditionalFormFieldValue({ step: this.STEP, field: name, type, value: form[name], blockIndex });
  }

  formIsValid = () => {
    return this.props.form.loading ? { disabled: true } : ''
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    let valid = true
    let { fieldsError: fieldsErrorList, form: formList } = this.state
    const { config } = this.props
    const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    fieldsErrorList.forEach((fieldsError, index) => {
      let form = formList[index];
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
    })

    if (!valid) {
      this.setState({ fieldsError: fieldsErrorList })
    } else {
      this.props.postAdditionalFormData({ form: this.state.form, step: this.STEP })
    }
  }

  gotoStep = (e, step) => {
    if (this.props.config.form.useNav) {
      this.props.redirectToUrl(step)
    }
  }

  onCancelar = e => {
    swal("¿Estás seguro de cancelar?", {
      buttons: {
        cancel: 'Cancelar',
        okay: "Si, estoy seguro",
      },
    })
      .then((value) => {
        switch (value) {
          case "okay":
            this.props.redirectToUrl(ROUTES.FORM8);
            break;

          default:
            break;

        }
      });
  }

  render() {
    const { config, form } = this.props
    const { fieldsError } = this.state
    // console.log('fieldsError')
    // console.log(fieldsError)
    if (form[this.STEP].length === 0 || fieldsError.length === 0) {
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
      const buttonClone = { width: '100%', marginTop: '40px', marginBottom: '70px' }
      const buttonRemove = { width: '20%', float: 'right' }
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
              if (blockItem.block.display === 'show' && bIndex === 0) {
                return (
                  <div className='form-div' key={bIndex}>
                    {!['info', 'warning'].includes(blockItem.block.class) &&
                      <h4 style={baseColor} className='form-block-title'> {blockItem.block.name} </h4>}
                  </div>
                )
              } else if (blockItem.block.display === 'show') {
                return (
                  <div className='form-div' key={bIndex} >
                    {bIndex === 0 && !['info', 'warning'].includes(blockItem.block.class) && <h4 className='form-block-title' > {blockItem.block.name} </h4>}
                    {bIndex > 0 && !['info', 'warning'].includes(blockItem.block.class) && <h5 style={{ display: 'inline' }} className='form-block-title' > {blockItem.block.name} </h5>}
                    {bIndex > 1 && <Button variant="outline-secondary" onClick={e => this.props.removeSigner(bIndex)} style={buttonRemove} >Eliminar</Button>}
                    <Row style={{ borderLeft: `7px solid ${config.baseColor}` }} className={blockItem.block.class === 'info' ? 'light-blue-section' : blockItem.block.class === 'warning' ? 'light-warning-section' : ''}>
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
                            return <InputField blockIndex={bIndex} {...field} key={fieldIndex} onChange={this.onChange}
                              error={fieldsError[bIndex - 1][field.name]} lang={config.form.settings.lang} />
                          case 'date':
                            return <DateField blockIndex={bIndex} {...field} key={fieldIndex} onChange={this.onChange}
                              error={fieldsError[bIndex - 1][field.name]} lang={config.form.settings.lang} />
                          case 'SELECTLIST':
                            return <SelectField blockIndex={bIndex} {...field} key={fieldIndex} onChange={this.onChange}
                              error={fieldsError[bIndex - 1][field.name]} lang={config.form.settings.lang} />
                          case 'TXTAREA':
                            return <TextAreaField blockIndex={bIndex} {...field} key={fieldIndex}
                              onChange={this.onChange} error={fieldsError[bIndex - 1][field.name]}
                              lang={config.form.settings.lang} />
                          case 'SWITCH':
                            return <SwitchField blockIndex={bIndex} {...field} key={fieldIndex} onChange={this.onChange}
                              error={fieldsError[bIndex - 1][field.name]} lang={config.form.settings.lang} />
                          case 'CHECKBOX':
                            return <CheckboxField blockIndex={bIndex} {...field} key={fieldIndex}
                              onChange={this.onChange} error={fieldsError[bIndex - 1][field.name]}
                              lang={config.form.settings.lang} />
                          case 'UPLOAD':
                            return <UploadField blockIndex={bIndex} {...field} key={fieldIndex} onChange={this.onChange}
                              error={fieldsError[bIndex - 1][field.name]} lang={config.form.settings.lang} />
                          case 'SIGNATUREPAD':
                            return <SignaturePadField blockIndex={bIndex} {...field} key={fieldIndex}
                              onChange={this.onChange} error={fieldsError[bIndex - 1][field.name]}
                              lang={config.form.settings.lang} />
                          default:
                            return <InputField blockIndex={bIndex} {...field} key={fieldIndex} onChange={this.onChange}
                              error={fieldsError[bIndex - 1][field.name]} lang={config.form.settings.lang} />
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
              <Col xs={0} md={4}></Col>
              <Col xs={12} md={8}>
                <Row>
                  <Col xs={6} md={4}>
                    <Button variant="outline-secondary" onClick={this.onCancelar} style={buttonClone}>Cancelar</Button>
                  </Col>
                  <Col xs={6} md={4}>
                    <Button variant="outline-secondary" onClick={e => this.props.cloneSigner()} style={buttonClone}>Agregar Otro</Button>
                  </Col>
                  <Col xs={12} md={4}>
                    <Button {...this.formIsValid()} style={buttonStyle} type="submit">Continuar</Button>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Form>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ config, form }) => ({
  config, form: form.additional
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAdditionalFormData,
      updateAdditionalFormFieldValue,
      redirectToUrl,
      postAdditionalFormData,
      cloneSigner,
      removeSigner
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignersFormComponent)
