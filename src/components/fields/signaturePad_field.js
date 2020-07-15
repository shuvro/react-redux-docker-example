import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePadField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, error, blockIndex
  } = props;
  let sigCanvas = React.createRef();
  label = label ? label : name;
  const getDataOnDrawEnd = (e) => {
    onChange(sigCanvas.toDataURL(), name, type, validation, blockIndex);
  }
  // if (initialValue && sigCanvas === null) {
  //   setTimeout(() => {
  //     try {
  //       sigCanvas.fromDataURL(initialValue);
  //     } catch (error) { }
  //   }, 200);
  // }

  const clearSignaturePad = (e) => {
    sigCanvas.clear();
    onChange('', name, type, validation, blockIndex);
  }
  const today = new Date();
  const todayString = `${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}  ${today.getHours()}:${today.getMinutes()}`
  if (display === 'show') {
    return (
      <React.Fragment>
        <Col xs={12} style={{ border: '2px solid #a5a5a5' }} onFocusCapture={e => console.log('here')} id="canvas-div-id" >
          <input id={name} type='hidden' />
          <SignatureCanvas id={name} clearOnResize={false} ref={(ref) => { sigCanvas = ref }} canvasProps={{ className: 'sigCanvas customSigPadStyle' }}
            onEnd={getDataOnDrawEnd}
          />
        </Col>
        {error.status && <Col xs={12} >
          <Form.Text className="text-red"> {error.message} </Form.Text>
        </Col>
        }
        <Col xs={6} style={{ marginTop: '20px' }} >
          <label>{todayString}</label>
        </Col>
        <Col xs={6} style={{ marginTop: '20px' }} >
          <Button className="eliminar-btn" onClick={e => clearSignaturePad(e)}>Limpiar Firma</Button>
        </Col>
      </React.Fragment>
    )
  } else {
    return '';
  }
}

export default SignaturePadField;