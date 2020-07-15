import React from 'react'
import { Col, Button, Form } from 'react-bootstrap'
import { forEach } from 'react-bootstrap/utils/ElementChildren'
import Row from 'react-bootstrap/Row'

const UploadField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display, deleteImage,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, error, blockIndex, attached, remoteUrl
  } = props
  let fileInputElement = React.createRef()
  let imageElmRef = React.createRef()
  label = label ? label : name
  placeholder = placeholder ? placeholder : label
  if (window.screen.availWidth < 667) {
    placeholder = ''
  }
  let manualRemove = false
  const onUpload = (e) => {
    if (e.target.value === '' && !manualRemove) {
      manualRemove = false
      return
    }
    onChange(e, name, type, validation, maxLength, minLength, blockIndex)
  }

  const removeData = (e) => {
    if (attached.filename) {
      deleteImage({ field: name })
    }
    manualRemove = true
    fileInputElement.value = ''
    var event = new Event('input', { bubbles: true })
    fileInputElement.dispatchEvent(event)
  }

  let references = {}

  function getOrCreateRef(id) {
    if (!references.hasOwnProperty(id)) {
      references[id] = React.createRef()
    }
    return references[id]
  }

  if (initialValue) {
    for (let i = 0; i < initialValue.length; i++) {
      let reader = new FileReader()
      reader.onload = (e) => {
        try {
          let referer = getOrCreateRef(initialValue[i].lastModified)
          referer.current.setAttribute('src', e.target.result)
        } catch (error) {

        }
      }
      reader.readAsDataURL(initialValue[i])
    }
  }
  // console.log(attached)
  // let attachedImageUrl = null
  // if (!initialValue && attached.filename) {
  //   attachedImageUrl = remoteUrl + attached.filename
  // }
    let attachedImageUrl = []
    if (!initialValue && attached.length) {
      for (let attachedImage of attached) {
        attachedImageUrl.push(<Col xs={4} key={attachedImage.timestamp+attachedImage.size+ Math.random().toString(36).slice(2)} style={{ 'padding': '10px' }}><img key={attachedImage.timestamp+attachedImage.size+ Math.random().toString(36).slice(2)}
                                                                                                    id={attachedImage.timestamp+attachedImage.size+ Math.random().toString(36).slice(2)}
                                                                                                    src={remoteUrl + attachedImage.filename}
                                                                                                    alt={attachedImage.filename} height={250}
                                                                                                    style={{'width': '100%'}}/></Col>)
      }
    }

  if (display === 'show') {
    const images = []
    if (initialValue && !attachedImageUrl.length) {
      for (let initialValue1 of initialValue) {
        images.push(<Col xs={4} key={initialValue1.lastModified} style={{ 'padding': '10px' }}><img ref={getOrCreateRef(initialValue1.lastModified)}
                                                                   id={initialValue1.lastModified}
                                                                    src='#'
                                                                   alt={initialValue1.lastModified} height={250}
                                                                   style={{'width': '100%'}}/></Col>)
      }
    }
    return (
      <React.Fragment>
        <Col xs={12} md={12}>
          <div className="upload-box" id={name}>
            <svg className="upload_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
              <g>
                <g>
                  <path fill="#2699fb"
                        d="M17 9l-5 5-5-5h3V5h4v4zm2.35-2.96A7.49 7.49 0 0 0 12 0C9.11 0 6.6 1.64 5.35 4.04A5.994 5.994 0 0 0 0 10c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                </g>
              </g>
            </svg>
            <div className="hold" onClick={e => fileInputElement.click()}><a
              className="subir-img-text"> {placeholder} </a>
              <span className="btn-file"> {label}
                <input onInput={e => onUpload(e)} type="file"
                       onClick={e => e.stopPropagation()} ref={inputFile => fileInputElement = inputFile}
                       accept="image/*"
                       multiple/>
              </span>
              {error.status && !initialValue &&
              <Form.Text className="text-red"> {error.message} </Form.Text>
              }
            </div>
          </div>
        </Col>
        {(initialValue || attachedImageUrl.length) && <Col xs={12} md={12}>
          {/*<div className='image-div'>*/}
            <Row>
              {attachedImageUrl}
            </Row>
            {/*{!attachedImageUrl && <img ref={imgElm => imageElmRef = imgElm} src='#' alt="image" />}*/}
            <Row>
              {images}
            </Row>
          {/*</div>*/}
          <Button className='eliminar-btn' onClick={e => removeData(e)}>
            <svg className='eliminar-btn-icon' xmlns="http://www.w3.org/2000/svg" width="13" height="14"
                 viewBox="0 0 14 14">
              <g>
                <g>
                  <path
                    d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/>
                </g>
              </g>
            </svg>
            Eliminar
          </Button>
        </Col>
        }
      </React.Fragment>
    )
  } else {
    return ''
  }
}

export default UploadField
