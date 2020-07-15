import actionType from './actionTypes';
import { axiosRequest } from '../utils/api';
import ROUTES from '../utils/routes';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import language from '../constants/error-msg-definitions';

const getLoginAtrributesRequest = () => ({ type: actionType.LOGIN_GET_ATRRIBUTES_REQUEST })
const getLoginAtrributesSuccess = (payload) => ({ type: actionType.LOGIN_GET_ATRRIBUTES_SUCCESS, payload })
const getLoginAtrributesError = () => ({ type: actionType.LOGIN_GET_ATRRIBUTES_ERROR })
const postLoginRequest = () => ({ type: actionType.LOGIN_POST_REQUEST })
const postLoginSuccess = (payload) => ({ type: actionType.LOGIN_POST_SUCCESS, payload })
const postLoginError = () => ({ type: actionType.LOGIN_POST_ERROR })

const getLoginAdditionalAttributesRequest = () => ({ type: actionType.LOGIN_GET_ADDITIONAL_ATTRIBUTES_REQUEST })
const getLoginAddtionalAtrributesSuccess = (payload) => ({ type: actionType.LOGIN_GET_ADDITIONAL_ATRRIBUTES_SUCCESS, payload })
const getLoginAdditionalAtrributesError = () => ({ type: actionType.LOGIN_GET_ADDITIONAL_ATRRIBUTES_ERROR })
const postAdditionalLoginRequest = () => ({ type: actionType.LOGIN_ADDITIONAL_POST_REQUEST })
const postAdditionalLoginSuccess = (payload) => ({ type: actionType.LOGIN_ADDITIONAL_POST_SUCCESS, payload })
const postAdditionalLoginError = () => ({ type: actionType.LOGIN_ADDITIONAL_POST_ERROR })

const getOTPAtrributesRequest = () => ({ type: actionType.OTP_GET_ATRRIBUTES_REQUEST })
const getOTPAtrributesSuccess = (payload) => ({ type: actionType.OTP_GET_ATRRIBUTES_SUCCESS, payload })
const getOTPAtrributesError = () => ({ type: actionType.OTP_GET_ATRRIBUTES_ERROR })
const postOTPRequest = (payload) => ({ type: actionType.OTP_POST_REQUEST, payload })
const postOTPSuccess = (payload) => ({ type: actionType.OTP_POST_SUCCESS, payload })
const postOTPError = () => ({ type: actionType.OTP_POST_ERROR })

const setLoginCred = (payload) => ({ type: actionType.SET_LOGIN_CRED, payload })
const flushLoginCred = () => ({ type: actionType.FLUSH_LOGIN_CRED })

const LOGIN_URL = '/forms/v1/KYCJuridico/login/'+ process.env.REACT_APP_CLIENT_ID +'/' + process.env.REACT_APP_CLIENT_SECRET;
const OTP_URL = '/forms/v1/KYCJuridico/otp/'+ process.env.REACT_APP_CLIENT_ID +'/' + process.env.REACT_APP_CLIENT_SECRET;
const REPRESENTATIVE_LIST_URL = '/forms/v1/KYCJuridico/loginAdditionalAttributes/' + process.env.REACT_APP_CLIENT_ID +'/' + process.env.REACT_APP_CLIENT_SECRET;

export const getLoginAtrributes = () => {
  return (dispatch) => {
    dispatch(getLoginAtrributesRequest())

    axiosRequest.get(LOGIN_URL)
      .then(response => {
        dispatch(getLoginAtrributesSuccess(response.data))
      })
      .catch(error => {
        console.log(error.response)
        dispatch(getLoginAtrributesError())
      })
  }
}
export const getRepresentativeList = () => {
  return (dispatch, getState) => {
    dispatch(getLoginAdditionalAttributesRequest())
    const state = getState()
    const headers = { Authorization: `bearer ${state.auth.loginToken}` }
    axiosRequest.get(REPRESENTATIVE_LIST_URL, {headers})
      .then(response => {
        dispatch(getLoginAddtionalAtrributesSuccess(response.data))
      })
      .catch(error => {
        console.log(error.response)
        dispatch(getLoginAdditionalAtrributesError())
      })
  }
}
export const postLoginInfo = (payload) => {
  return (dispatch, getState) => {
    dispatch(postAdditionalLoginRequest(payload))

    const state = getState();
    const lang = state.config.form.settings.lang;
    let formData = new URLSearchParams();
    Object.keys(payload).forEach(field => {
      formData.set(field, payload[field]);
    })
    const headers = { Authorization: `bearer ${state.auth.loginToken}` };
    axiosRequest.post(REPRESENTATIVE_LIST_URL, formData, { headers })
      .then(response => {
        const data = response.data;
        if (data.success) {
          toastr.success(language[lang].success, language[lang].loginSuccess)
          dispatch(postAdditionalLoginSuccess(data));
          dispatch(push(ROUTES.OTP));
        } else {
          toastr.warning(language[lang].warning, data.errors ? data.errors[0].error : language[lang].invalidOtp);
          dispatch(postAdditionalLoginError())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(postOTPError())
      })
  }

}

export const postLoginForm = (payload) => {
  return (dispatch, getState) => {
    dispatch(postLoginRequest())
    const state = getState();
    const lang = state.config.form.settings.lang;
    let formData = new URLSearchParams();
    Object.keys(payload).forEach(field => {
      formData.set(field, payload[field]);
    })

    axiosRequest.post(LOGIN_URL, formData)
      .then(response => {
        const data = response.data;
        if (data.success) {
          toastr.success(language[lang].success, language[lang].loginSuccess)
          dispatch(postLoginSuccess(data));
          dispatch(push(ROUTES.COMPANY));
        } else {
          toastr.warning(language[lang].warning, data.errors ? data.errors[0].error : language[lang].invalidCred);
          dispatch(postLoginError())
          // dispatch(postLoginSuccess(data));
          // dispatch(push(ROUTES.OTP));
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(postLoginError())
      })
  }

}

export const getOTPAtrributes = () => {
  return (dispatch, getState) => {
    dispatch(getOTPAtrributesRequest())
    const state = getState();
    const headers = { Authorization: `bearer ${state.auth.loginToken}` };
    axiosRequest.get(OTP_URL, { headers })
      .then(response => {
        dispatch(getOTPAtrributesSuccess(response.data))
      })
      .catch(error => {
        console.log(error.response)
        dispatch(getOTPAtrributesError())
      })
  }

}

export const postOTPForm = (payload) => {
  return (dispatch, getState) => {
    dispatch(postOTPRequest(payload))

    const state = getState();
    const lang = state.config.form.settings.lang;
    let formData = new URLSearchParams();
    Object.keys(payload).forEach(field => {
      formData.set(field, payload[field]);
    })
    formData.set('token', state.auth.loginToken);
    const headers = { Authorization: `bearer ${state.auth.loginToken}` };
    axiosRequest.post(OTP_URL, formData, { headers })
      .then(response => {
        const data = response.data;
        if (data.success) {
          toastr.success(language[lang].success, language[lang].otpSuccess)
          dispatch(postOTPSuccess(data));
          dispatch(push(ROUTES.FORM1));
        } else {
          toastr.warning(language[lang].warning, data.errors ? data.errors[0].error : language[lang].invalidOtp);
          dispatch(postOTPError())
          // dispatch(postOTPSuccess(data));
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(postOTPError())
      })
  }

}

export const isLoggedInAndRedirect = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (auth.loginToken && auth.otpToken && auth.tokenExpiredAt && auth.tokenExpiredAt > new Date()) {
      dispatch(push(ROUTES.FORM1));
    }
  }
}

export const checkStorageLoginCred = () => {
  return (dispatch, getState) => {
    const state = getState();
    const loginToken = localStorage.getItem('loginToken');
    const otpToken = localStorage.getItem('otpToken');
    const tokenExpiredAt = localStorage.getItem('tokenExpiredAt');
    const refreshToken = localStorage.getItem('loginRefreshToken');
    const token = localStorage.getItem('token');
    if (token && loginToken && otpToken && tokenExpiredAt && tokenExpiredAt > new Date()) {
      dispatch(setLoginCred({ loginToken, otpToken, tokenExpiredAt, token }));
      setTimeout(() => {
        dispatch(push(state.router.location.pathname));
      }, 100);
    }
  }
}

export const redirectToLogin = () => {
  return (dispatch) => {
    dispatch(push(ROUTES.LOG_IN));
  }

}

export const logout = (dispatch) => {
  localStorage.removeItem('loginToken');
  localStorage.removeItem('otpToken');
  localStorage.removeItem('tokenExpiredAt');
  localStorage.removeItem('loginRefreshToken');
  localStorage.removeItem('token');
  localStorage.removeItem('primaryRepresentative');
  toastr.warning('Notice', 'Login Session Expired');
  dispatch(flushLoginCred());
}
export const doLogout  = () => dispatch => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('otpToken');
    localStorage.removeItem('tokenExpiredAt');
    localStorage.removeItem('loginRefreshToken');
    localStorage.removeItem('token');
    localStorage.removeItem('primaryRepresentative');
    toastr.warning('Notice', 'Login Session Expired')
    dispatch(flushLoginCred())
    dispatch(redirectToLogin())

}
