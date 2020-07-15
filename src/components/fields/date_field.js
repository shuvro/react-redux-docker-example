import React from 'react'
import { Form, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import * as moment from 'moment'
import es from 'date-fns/locale/es'
import language from '../../constants/error-msg-definitions'

registerLocale('es', es)

const DateField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, error, lang, blockIndex
  } = props
  // const controlId = name + Math.round(Math.random() * 100).toString();
  label = label ? label : name
  let inputProps = {}
  placeholder = placeholder ? placeholder : label
  if (window.screen.availWidth < 667) {
    placeholder = ''
  }

  if (typeof (initialValue) === 'string' && initialValue.length > 0) {
    try {
      // console.log('here ')
      // console.log('here initialValue',initialValue)
      initialValue = moment(initialValue, 'MM/DD/YYYY').toDate()
    } catch (error) {
      initialValue = ''
    }
  }

  // console.log('initialValue',initialValue)

  let errorMsgText = 'text-red'
  let errorWarnIcon = 'fas fa-times error-input-icon'
  if (error.warn && isRequired && !initialValue) {
    inputProps.className = 'react-datepicker-ignore-onclickoutside border-warn'
    errorMsgText = 'text-warn'
    error.status = true
    error.message = language[lang].required
    errorWarnIcon = 'fas fa-exclamation-triangle warn-input-icon'
  } else {
    inputProps.className = error.status ? 'react-datepicker-ignore-onclickoutside border-red' : 'react-datepicker-ignore-onclickoutside'
  }

  if (display === 'show') {
    setTimeout(() => {
      const datePickers = document.getElementsByClassName('react-datepicker__input-container')
      for (let datePicker of datePickers) {
        datePicker.childNodes[0].setAttribute('readOnly', true)
      }
    }, 1000)
    let minDateValue = null
    // if (name === 'idExpirationDate') {
    //   minDateValue = moment(new Date(),"MM/DD/YYYY").add(1, 'days').toDate();
    // }
    // console.log('blockIndex', blockIndex)
    return (
      <Col xs={cellphoneSize} md={desktopSize}>
        <Form.Group controlId={name}>
          <Form.Label className="field-label">{label}</Form.Label>
          <DatePicker id={name} selected={initialValue} placeholderText={placeholder}
                      onChange={date => onChange(moment(date).format('MM/DD/YYYY'), name, type, validation, blockIndex)}
                      dateFormat='MM / dd / yyyy' customInput={<input readOnly type="text" placeholder={placeholder}
                                                                      className={inputProps.className} value=""/>}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      locale='es'
                      minDate={minDateValue}
          >
          <div style={{ color: "red" }}>No olvides seleccionar el día</div>
          </DatePicker>
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
    return ''
  }
}

export default DateField