import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { Button, Col } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'

const UploadFieldDropzone = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display, deleteImage,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, error, blockIndex, attached, remoteUrl, step, getFormData
  } = props
  let UPLOAD_FORM_URL = '';
  if (step === 7) {
    UPLOAD_FORM_URL = process.env.REACT_APP_API_ENDPOINT + '/forms/v1/KYCJuridico/uploadFiles/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
  } else if (step === 4) {
    UPLOAD_FORM_URL = process.env.REACT_APP_API_ENDPOINT + '/forms/v1/KYCJuridico/foundOriginsFiles/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
  }

  const getUploadParams = async ({ file, headers }) => {
    let body = new FormData()
    body.append(name, file)
    return { url: UPLOAD_FORM_URL, headers: { Authorization: 'bearer ' + localStorage.getItem('token') }, body }
  }

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === "done") {
      remove();
      getFormData({step: step});
    }
  }
  const removeData = (imageFileName, fieldName) => {
      deleteImage({ imageFileName: imageFileName, field: fieldName, blockIndex: blockIndex, step: step })
  }

  let attachedImageUrl = []
  if (!initialValue && attached.length) {
    for (let attachedImage of attached) {
      if (attachedImage.filename) {
        attachedImageUrl.push(
          <Col className="container-img" md={2}
               key={attachedImage.timestamp + attachedImage.size + Math.random().toString(36).slice(2)}
               style={{ 'padding': '15px' }}>
            <img
              key={attachedImage.timestamp + attachedImage.size + Math.random().toString(36).slice(2)}
              id={attachedImage.timestamp + attachedImage.size + Math.random().toString(36).slice(2)}
              src={remoteUrl + attachedImage.filename}
              alt={attachedImage.filename} height={150}
              style={{ 'width': '100%' }}/>
            <div className="overlay"><div className="button-img" onClick={ e => removeData(attachedImage.filename, name)}><i
              className="fa fa-trash fa-3x" aria-hidden="true"/></div></div>

          </Col>
        )
      }
    }
  }

  if (display === 'show') {
    return (
      <React.Fragment>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          inputWithFilesContent={'Agregar archivos'}
          inputContent={'Arrastra los archivos aquí o haz clic para añadirlos'}
          accept="image/*"
          canCancel={false}
          styles={{ dropzone: { minHeight: 150, maxHeight: 250 } }}
        />
        {(initialValue || attachedImageUrl.length) && <Col xs={12} md={12}>
          <Row>
            {attachedImageUrl}
          </Row>
        </Col>
        }
      </React.Fragment>

    )
  } else {
    return ''
  }
}
export default UploadFieldDropzone