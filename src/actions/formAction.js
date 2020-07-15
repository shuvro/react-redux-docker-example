import actionType from './actionTypes'
import { axiosRequest } from '../utils/api'
import ROUTES from '../utils/routes'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import { logout } from './authAction'
import language from '../constants/error-msg-definitions'
import * as _ from 'lodash'

const getFormRequest = () => ({ type: actionType.GET_FORM_REQUEST })
const getFormSuccess = (payload) => ({ type: actionType.GET_FORM_SUCCESS, payload })
const getFormError = () => ({ type: actionType.GET_FORM_ERROR })
const postFormRequest = () => ({ type: actionType.POST_FORM_REQUEST })
const postFormSuccess = (payload) => ({ type: actionType.POST_FORM_SUCCESS, payload })
const postFormError = () => ({ type: actionType.POST_FORM_ERROR })
const autoPostFormRequest = () => ({ type: actionType.AUTO_POST_FORM_REQUEST })
const autoPostFormSuccess = (payload) => ({ type: actionType.AUTO_POST_FORM_SUCCESS, payload })
const autoPostFormError = () => ({ type: actionType.AUTO_POST_FORM_ERROR })
const postAdditionalFormSuccess = (payload) => ({ type: actionType.ADDITIONAL_FORM_POST_SUCCESS, payload })
const getSignersSuccess = (payload) => ({ type: actionType.GET_SIGNERS_SUCCESS, payload })
const getSingleSignerSuccess = (payload) => ({ type: actionType.GET_SINGLE_SIGNER_SUCCESS, payload })
const getPartnerSuccess = (payload) => ({ type: actionType.GET_PARTNER_SUCCESS, payload })
const deleteSignerSuccess = () => ({ type: actionType.DELETE_SIGNER_SUCCESS })
const deletePartnerSuccess = () => ({ type: actionType.DELETE_PARTNER_SUCCESS })
const cloneSignerBlock = () => ({ type: actionType.CLONE_SIGNER_BLOCK })
const removeSignerBlock = (bIndex) => ({ type: actionType.REMOVE_SIGNER_BLOCK, bIndex })
const cloneRepresentativeBlock = (tabs) => ({ type: actionType.CLONE_REPRESENTATIVE_BLOCK, tabs })
const removeRepresentativeBlock = (bIndex) => ({ type: actionType.REMOVE_REPRESENTATIVE_BLOCK, bIndex })
const removeImage = (bIndex, stepIndex, imageName) => ({
  type: actionType.REMOVE_IMAGE_PREVIEW,
  bIndex,
  stepIndex,
  imageName
})

export const updateFormFieldValue = (payload) => ({ type: actionType.UPDATE_FORM_FIELD_VALUE, payload })
export const updateAdditionalFormFieldValue = (payload) => ({
  type: actionType.UPDATE_ADDITIONAL_FORM_FIELD_VALUE,
  payload
})
export const updateRepresentativeFormFieldValue = (payload) => ({
  type: actionType.UPDATE_REPRESENTATIVE_FORM_FIELD_VALUE,
  payload
})
export const cloneCurrency = (payload) => ({ type: actionType.CLONE_CURRENCY, payload })
export const removeClonedCurrency = (payload) => ({ type: actionType.REMOVE_CLONE_CURRENCY, payload })
const FORM1_URL = '/forms/v1/KYCJuridico/primaryRepresentative/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM2_URL = '/forms/v1/KYCJuridico/mainScreen/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM3_URL = 'forms/v1/KYCJuridico/politicalInfo/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM4_URL = '/forms/v1/KYCJuridico/foundOrigins/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM5_URL = '/forms/v1/KYCJuridico/bankingInfo/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM6_URL = '/forms/v1/KYCJuridico/expectedActivity/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM7_URL = '/forms/v1/KYCJuridico/uploadFiles/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const FORM8_URL = '/forms/v1/KYCJuridico/signature/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const SIGNERS_URL = '/forms/v1/KYCJuridico/signers/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const PARTNERS_URL = '/forms/v1/KYCJuridico/partners/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const ADDITONL_Signers_URL = '/forms/v1/KYCJuridico/additionalSigners/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const Single_Signers_URL = '/forms/v1/KYCJuridico/additionalSignerById/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const Delete_Single_Signers_URL = '/forms/v1/KYCJuridico/deleteAddditionalSigner/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET
const DELETE_PARTNER_URL = '/forms/v1/KYCJuridico/deletePartnerById/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET

export const getFormData = (payload) => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    let URL = null
    switch (payload.step) {
      case 1:
        URL = FORM1_URL
        break
      case 2:
        URL = FORM2_URL
        break
      case 3:
        URL = FORM3_URL
        break
      case 4:
        URL = FORM4_URL
        break
      case 5:
        URL = FORM5_URL
        break
      case 6:
        URL = FORM6_URL
        break
      case 7:
        URL = FORM7_URL
        break
      case 8:
        URL = FORM8_URL
        break
      default:
        break
    }
    if (URL) {
      const state = getState()
      const headers = { Authorization: `bearer ${state.auth.token}` }
      let params = {}
      if (payload.step === 1) {
        params = {
          lastname: localStorage.getItem('primaryRepresentative')
        }
      }
      axiosRequest.get(URL, { headers, params })
        .then(response => {
          dispatch(getFormSuccess({
            data: response.data,
            step: payload.step,
            additional: payload.additional
          }))
        })
        .catch(error => {
          const response = error.response
          dispatch(getFormError())
          if (response && response.status === 401) {
            logout(dispatch)
          }
        })
    } else {
      dispatch(getFormError())
    }
  }

}

export const getAdditionalFormData = (payload) => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    let URL = null
    switch (payload.step) {
      case 1:
        URL = FORM1_URL
        break
      case 2:
        URL = FORM2_URL
        break
      case 3:
        URL = FORM3_URL
        break
      case 5:
        URL = FORM4_URL
        break
      case 6:
        URL = FORM8_URL
        break
      case 'new':
        URL = SIGNERS_URL
        break
      default:
        break
    }
    if (URL) {
      const state = getState()
      const headers = { Authorization: `bearer ${state.auth.token}` }
      axiosRequest.get(URL, { headers })
        .then(response => {
          dispatch(getFormSuccess({
            data: response.data,
            step: payload.step,
            additional: payload.additional
          }))
        })
        .catch(error => {
          const response = error.response
          dispatch(getFormError())
          if (response && response.status === 401) {
            logout(dispatch)
          }
        })
    } else {
      dispatch(getFormError())
    }
  }

}

export const postFormData = (payload) => {
  return (dispatch, getState) => {
    dispatch(postFormRequest())
    let URL = null
    let nextForm = null
    switch (payload.step) {
      case 1:
        URL = FORM1_URL
        nextForm = ROUTES.FORM2
        break
      case 2:
        URL = FORM2_URL
        nextForm = ROUTES.FORM3
        break
      case 3:
        URL = FORM3_URL
        nextForm = ROUTES.FORM4
        break
      case 4:
        URL = FORM4_URL
        nextForm = ROUTES.FORM5
        break
      case 5:
        URL = FORM5_URL
        nextForm = ROUTES.FORM6
        break
      case 6:
        URL = FORM6_URL
        nextForm = ROUTES.FORM7
        break
      case 7:
        URL = FORM7_URL
        // nextForm = ROUTES.DECISION
        nextForm = ROUTES.FORM8
        break
      case 8:
        URL = FORM8_URL
        nextForm = ROUTES.DONE
        break
      default:
        break
    }
    if (URL && nextForm) {
      const state = getState()
      const lang = state.config.form.settings.lang
      let formData = [4, 7].includes(payload.step) ? new FormData() : new URLSearchParams()
      let traverse = false

      Object.keys(payload.form).forEach(field => {
        if ([7].includes(payload.step)) {
          for (let i = 0; i < payload.form[field].length; i++) {
            formData.append(field + '-' + i, payload.form[field][i])
          }
        } else if ([4].includes(payload.step)) {
          if (field === 'thirdPartyPicture') {
            for (let i = 0; i < payload.form[field].length; i++) {
              formData.append(field + '-' + i, payload.form[field][i])
            }
          } else {
            formData.append(field, payload.form[field])
          }
        } else if ([2].includes(payload.step) && traverse === false) {
          traverse = true

          let totalData = []
          let repForm = state.form[2]
          let obj = {}
          Object.keys(repForm).forEach(rep => {
            if (repForm[rep].block) {
              if (repForm[rep].block.fields) {
                repForm[rep].block.fields.forEach(field1 => {
                  if (!obj.hasOwnProperty(field1.name)) {
                    obj[field1.name] = field1.initialValue
                  } else {
                    obj = {}
                    obj[field1.name] = field1.initialValue
                  }
                })
                if (Object.keys(obj).length) {
                  let exists = _.findIndex(totalData, (o) => {
                    return _.isMatch(o, obj)
                  }) > -1
                  if (!exists) {
                    totalData.push(obj)
                  }
                }
              }
            }
          })
          formData.set('data', JSON.stringify(totalData))
        } else {
          formData.set(field, payload.form[field])
          if ([1].includes(payload.step)) {
            formData.set('lastname', localStorage.getItem('primaryRepresentative'))
          }
        }
      })

      const headers = { Authorization: `bearer ${state.auth.token}` }
      axiosRequest.post(URL, formData, { headers })
        .then(response => {
          const data = response.data
          if (data.success) {
            dispatch(postFormSuccess(data))
            dispatch(push(nextForm))
          } else {
            toastr.warning(language[lang].warning, data.errors ? data.errors[0].error : language[lang].postFailed)
            dispatch(postFormError())
          }
        })
        .catch(error => {
          const response = error.response
          toastr.error(language[lang].error, language[lang].postFailed)
          dispatch(postFormError())
          if (response && response.status === 401) {
            logout(dispatch)
          }
        })
    } else {
      dispatch(postFormError())
    }
  }

}

export const autoPostFormData = (payload) => {
  return (dispatch, getState) => {
    dispatch(autoPostFormRequest())
    let URL = null
    let nextForm = null
    switch (payload.step) {
      case 1:
        URL = FORM1_URL
        nextForm = ROUTES.FORM2
        break
      case 2:
        URL = FORM2_URL
        nextForm = ROUTES.FORM3
        break
      case 3:
        URL = FORM3_URL
        nextForm = ROUTES.FORM4
        break
      case 4:
        URL = FORM4_URL
        nextForm = ROUTES.FORM5
        break
      case 5:
        URL = FORM5_URL
        nextForm = ROUTES.FORM6
        break
      case 6:
        URL = FORM6_URL
        nextForm = ROUTES.FORM7
        break
      case 7:
        URL = FORM7_URL
        nextForm = ROUTES.FORM8
        break
      case 8:
        URL = FORM8_URL
        nextForm = ROUTES.DONE
        break
      default:
        break
    }
    if (URL && nextForm) {
      const state = getState()
      let formData = new FormData()
      Object.keys(payload.form).forEach(field => {
        formData.set(field, payload.form[field])
      })

      const headers = { Authorization: `bearer ${state.auth.token}` }
      axiosRequest.post(URL, formData, { headers })
        .then(response => {
          const data = response.data
          if (data.success) {
            dispatch(autoPostFormSuccess(data))
          } else {
            dispatch(autoPostFormError())
          }
        })
        .catch(error => {
          const response = error.response
          dispatch(autoPostFormError())
          if (response && response.status === 401) {
            // logout(dispatch);
          }
        })
    } else {
      dispatch(autoPostFormError())
    }
  }

}

export const postAdditionalFormData = (payload) => {
  return (dispatch, getState) => {
    dispatch(postFormRequest())
    const state = getState()
    const lang = state.config.form.settings.lang
    const additional = state.form.additional.new

    let formData = new URLSearchParams()
    let totalData = []
    Object.keys(additional).forEach(formId => {
      let obj = {}
      if (formId > 0) {
        additional[formId].block.fields.forEach(field => {
          obj[field.name] = field.initialValue
        })
        totalData.push(obj)
      }
    })
    formData.set('data', JSON.stringify(totalData))

    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.post(SIGNERS_URL, formData, { headers })
      .then(response => {
        const data = response.data
        if (data.success) {
          dispatch(postAdditionalFormSuccess(data))
          dispatch(push(ROUTES.FORM8))
        } else {
          toastr.warning(language[lang].warning, data.errors ? data.errors[0].error : language[lang].postFailed)
          dispatch(postFormError())
        }
      })
      .catch(error => {
        const response = error.response
        // console.log(response)
        toastr.error(language[lang].error, language[lang].postFailed)
        dispatch(postFormError())
        if (response && response.status === 401) {
          logout(dispatch)
        }
      })
  }

}

export const getAdditionalSigners = () => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.get(ADDITONL_Signers_URL, { headers })
      .then(response => {
        dispatch(getSignersSuccess({
          data: response.data.block.signers
        }))
      })
      .catch(error => {
        const response = error.response
        console.log(response)
        dispatch(getFormError())
        if (response && response.status === 401) {
          logout(dispatch)
        }
      })
  }

}

export const getSignerData = (payload) => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    const signerId = payload.id
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.get(`${Single_Signers_URL}/${signerId}`, { headers })
      .then(response => {
        const data = response.data
        if (data.success) {
          dispatch(getSingleSignerSuccess({
            data: data.block.signer[0]
          }))
        } else {
          dispatch(getFormError())
        }
      })
      .catch(error => {
        const response = error.response
        console.log(response)
        dispatch(getFormError())
        if (response && response.status === 401) {
          logout(dispatch)
        }
      })
  }
}

export const postPartnerData = (payload) => {
  return (dispatch, getState) => {
    dispatch(postFormRequest())
    let URL = PARTNERS_URL
    let nextForm = ROUTES.FORM1
    if (URL && nextForm) {
      const state = getState()
      const lang = state.config.form.settings.lang

      let formData = new URLSearchParams()
      Object.keys(payload.form).forEach(field => {
        formData.set(field, payload.form[field])
      })
      formData.set('partnerId', payload.partnerId)

      const headers = { Authorization: `bearer ${state.auth.token}` }
      axiosRequest.post(URL, formData, { headers })
        .then(response => {
          const data = response.data
          if (data.success) {
            dispatch(postFormSuccess(data))
            dispatch(push(nextForm))
            dispatch(getFormData({ step: 1 }))
          } else {
            toastr.warning(language[lang].warning, data.errors ? data.errors[0].error : language[lang].postFailed)
            dispatch(postFormError())
          }
        })
        .catch(error => {
          const response = error.response
          console.log(response)
          toastr.error(language[lang].error, response.data.msg)
          dispatch(postFormError())
        })
    } else {
      dispatch(postFormError())
    }
  }
}

export const getPartnerData = (payload) => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    const partnerId = payload.id
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.get(`${PARTNERS_URL}/${partnerId}`, { headers })
      .then(response => {
        dispatch(getPartnerSuccess({
          data: response.data,
          step: payload.step
        }))
      })
      .catch(error => {
        const response = error.response
        console.log(response)
        dispatch(getFormError())
        if (response && response.status === 401) {
          logout(dispatch)
        }
      })
  }

}

export const deleteSigner = (payload) => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    const signerId = payload.id
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.delete(`${Delete_Single_Signers_URL}/${signerId}`, { headers })
      .then(response => {
        const data = response.data
        if (data.success) {
          dispatch(deleteSignerSuccess())
          dispatch(getAdditionalSigners())
        } else {
          dispatch(getFormError())
        }
      })
      .catch(error => {
        const response = error.response
        console.log(response)
        dispatch(getFormError())
        if (response && response.status === 401) {
          logout(dispatch)
        }
      })
  }

}
export const deletePartner = (payload) => {
  return (dispatch, getState) => {
    dispatch(getFormRequest())
    const partnerId = payload.id
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.delete(`${DELETE_PARTNER_URL}/${partnerId}`, { headers })
      .then(response => {
        const data = response.data
        if (data.success) {
          dispatch(deletePartnerSuccess())
          dispatch(getFormData({ step: 1 }))
        } else {
          dispatch(getFormError())
        }
      })
      .catch(error => {
        const response = error.response
        console.log(response)
        dispatch(getFormError())
        if (response && response.status === 401) {
          logout(dispatch)
        }
      })
  }
}

export const cloneSigner = () => {
  return (dispatch, getState) => {
    dispatch(cloneSignerBlock())
  }
}

export const removeSigner = (bIndex) => {
  return (dispatch, getState) => {
    dispatch(removeSignerBlock(bIndex))
  }
}

export const cloneRepresentative = (tabs) => {
  return (dispatch, getState) => {
    dispatch(cloneRepresentativeBlock(tabs))
  }
}

export const removeRepresentative = (bIndex) => {
  return (dispatch, getState) => {
    dispatch(removeRepresentativeBlock(bIndex))
  }
}

export const deleteImage = (payload) => {
  return (dispatch, getState) => {
    const fieldName = payload.field
    const imageName = payload.imageFileName
    const blockIndex = payload.blockIndex
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.token}` }
    axiosRequest.delete(`forms/v1/KYCJuridico/${fieldName}/${process.env.REACT_APP_CLIENT_ID}/${process.env.REACT_APP_CLIENT_SECRET}`, {
      headers,
      data: { imageName: imageName }
    })
      .then(response => {
        if (response.data.success) {
          dispatch(removeImage(blockIndex, payload.step, imageName))
        }
      })
      .catch(error => {
      })
  }
}

