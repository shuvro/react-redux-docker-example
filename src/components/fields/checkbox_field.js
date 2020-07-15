import React from 'react';
import { Row, Col } from 'react-bootstrap';

const CheckboxField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, isSelected, display,
    action, helper, onChange, desktopSize, cellphoneSize, tabletSize, blockIndex
  } = props;
  label = label ? label : name;
  if (display === 'show') {
    return (
      <Col xs={cellphoneSize} md={desktopSize} style={{ marginTop: '20px' }} >
        <ul className="unstyled">
          <li>
            <input onChange={e => { onChange(e, name, type, validation, blockIndex) }}
              className="styled-checkbox" id={name} type="checkbox" defaultChecked={isSelected} />
            <label htmlFor={name}>{label}</label>
          </li>
        </ul>
      </Col>
    )
  } else {
    return '';
  }
}

export default CheckboxField;