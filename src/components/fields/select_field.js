import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import Select2 from 'react-select2-wrapper'
import 'react-select2-wrapper/css/select2.css'
import language from '../../constants/error-msg-definitions'


const SelectField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, list, variation, error, lang,
    blockIndex, addRemoveButton, removeCurrency, addNewBtn, cloneCurrencyTrigger, fieldIndex
  } = props
  // const controlId = name + Math.round(Math.random() * 100).toString();
  label = label ? label : name
  let inputProps = {}
  inputProps.defaultValue = initialValue
  // inputProps.required = isRequired;
  let errorWarnIcon = 'fas fa-times error-input-icon'
  let errorMsgText = 'text-red'
  if (error.warn && isRequired && !initialValue) {
    inputProps.className = 'form-control field-input-text border-warn'
    errorMsgText = 'text-warn'
    error.status = true
    error.message = language[lang].required
    errorWarnIcon = 'fas fa-exclamation-triangle warn-input-icon'
  } else {
    inputProps.className = error.status ? 'form-control field-input-text border-red' : 'form-control field-input-text'
  }
  if (display === 'show') {
    return (
      <React.Fragment>
        <Col xs={cellphoneSize} md={desktopSize}>
          <Form.Group controlId={name}>
            <Form.Label className="field-label">{label}</Form.Label>
            {variation === '' &&
            <Form.Control as="select" onInput={e => {
              onChange(e, name, type, validation, blockIndex)
            }} className="field-input-text" {...inputProps}>
              <option value=""></option>
              {list.map((item, index) => <option value={item} key={index}>{item}</option>)}
            </Form.Control>
            }
            {variation === 'select2' &&
            <div>
              <Select2 style={{ width: '100%' }} data={list} value={initialValue} onChange={e => {
                onChange(e, name, type, validation, blockIndex)
              }}
                       options={
                         {
                           placeholder: placeholder
                         }
                       }
              />
            </div>
            }
            {error.status &&
            <React.Fragment>
              <i className={errorWarnIcon}></i>
              <Form.Text className={errorMsgText}> {error.message} </Form.Text>
            </React.Fragment>
            }
          </Form.Group>
        </Col>
        {/*{(addNewBtn && blockIndex > 2) &&*/}
        {/*<Col xs={3} md={3}>*/}
        {/*  <Button type="button" style={{*/}
        {/*    display: 'block',*/}
        {/*    width: '100%',*/}
        {/*    border: 'none',*/}
        {/*    fontSize: '16px',*/}
        {/*    cursor: 'pointer',*/}
        {/*    textAlign: 'center',*/}
        {/*    transform: 'translateY(87%)'*/}
        {/*  }} onClick={e => cloneCurrencyTrigger(blockIndex)}>Agregar Nuevo</Button>*/}
        {/*</Col>}*/}
        {/*{(addRemoveButton && fieldIndex > 0 && blockIndex > 2) &&*/}
        {/*  <React.Fragment>*/}
        {/*    <Col xs={3} md={3}>*/}
        {/*      <Button type="button" style={{*/}
        {/*        display: 'block',*/}
        {/*        width: '100%',*/}
        {/*        border: 'none',*/}
        {/*        fontSize: '16px',*/}
        {/*        cursor: 'pointer',*/}
        {/*        textAlign: 'center',*/}
        {/*        transform: 'translateY(87%)'*/}
        {/*      }} onClick={e => cloneCurrencyTrigger(blockIndex)}>Agregar Nuevo</Button>*/}
        {/*    </Col>*/}
        {/*    <Col xs={3} md={3}>*/}
        {/*      <Button type="button" style={{*/}
        {/*        display: 'block',*/}
        {/*        backgroundColor: '#6c757d',*/}
        {/*        width: '100%',*/}
        {/*        border: 'none',*/}
        {/*        fontSize: '16px',*/}
        {/*        cursor: 'pointer',*/}
        {/*        textAlign: 'center',*/}
        {/*        transform: 'translateY(87%)'*/}
        {/*      }} onClick={e => removeCurrency(blockIndex, fieldIndex)}>Eliminar</Button>*/}
        {/*    </Col>*/}
        {/*  </React.Fragment>*/}
        {/*}*/}
      </React.Fragment>
    )
  } else {
    return ''
  }
}

export default SelectField
