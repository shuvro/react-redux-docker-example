import React from 'react';
import { Form, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import language from '../../constants/error-msg-definitions';

const InputField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, error, mask, lang, autoFocus, blockIndex
  } = props;
  // const controlId = name + Math.round(Math.random() * 100).toString();
  label = label ? label : name;
  let inputProps = {};
  inputProps.type = ['text', 'hidden', 'password'].includes(type) ? type : 'text';
  inputProps.defaultValue = initialValue;
  // inputProps.required = isRequired;
  inputProps.maxLength = maxLength ? maxLength : 255;
  inputProps.minLength = minLength ? minLength : isRequired ? 1 : 0;
  placeholder = placeholder ? placeholder : label;
  if (window.screen.availWidth < 667) {
    placeholder = '';
  }
  inputProps.placeholder = placeholder;

  let errorMsgText = 'text-red';
  let errorWarnIcon = 'fas fa-times error-input-icon';
  if (error.warn && isRequired && !initialValue) {
    inputProps.className = 'form-control field-input-text border-warn';
    errorMsgText = 'text-warn';
    error.status = true;
    error.message = language[lang].required;
    errorWarnIcon = 'fas fa-exclamation-triangle warn-input-icon';
  } else {
    inputProps.className = error.status ? 'form-control field-input-text border-red' : 'form-control field-input-text';
  }
  if(autoFocus) {
    inputProps.autoFocus = autoFocus
  }
  if (display === 'show') {
    return (
      <Col xs={cellphoneSize} md={desktopSize} >
        <Form.Group controlId={name}>
          <Form.Label className="field-label">{label}</Form.Label>
          {mask === 'money' && <NumberFormat id={name} onInput={e => { onChange(e, name, type, validation, blockIndex, mask) }} value={initialValue} thousandSeparator={true} {...inputProps} />}
          {mask === 'euro_money' && <NumberFormat id={name} onInput={e => { onChange(e, name, type, validation, blockIndex, mask) }} value={initialValue} decimalScale={2} fixedDecimalScale={true} {...inputProps} />}
          {!['money', 'euro_money'].includes(mask) && <Form.Control onInput={e => { onChange(e, name, type, validation, blockIndex, mask) }} {...inputProps} />}
          {error.status &&
            <React.Fragment>
              <i className={errorWarnIcon}></i>
              <Form.Text className={errorMsgText}> {error.message} </Form.Text>
            </React.Fragment>
          }
        </Form.Group>
      </Col>
    )
  } else {
    return '';
  }
}

export default InputField;