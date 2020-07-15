import actionType from '../actions/actionTypes'

const initialState = {
  loginToken: null,
  refreshToken: null,
  otp: null,
  otpToken: null,
  token: null,
  tokenExpiredAt: null,
  atrributes: null,
  company: null,
  tempRepresentativeName: null,
  otpAtrributes: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_GET_ATRRIBUTES_REQUEST:
      return { ...state, loading: true }

    case actionType.LOGIN_GET_ATRRIBUTES_SUCCESS:
      return { ...state, loading: false, atrributes: action.payload }

    case actionType.LOGIN_GET_ATRRIBUTES_ERROR:
      return { ...state, loading: false }

    case actionType.LOGIN_POST_REQUEST:
      return { ...state, loading: true }

    case actionType.LOGIN_POST_SUCCESS:
      localStorage.setItem('loginToken', action.payload.token)
      localStorage.setItem('loginRefreshToken', action.payload.token)
      return { ...state, loading: false, loginToken: action.payload.token, refreshToken: action.payload.refreshToken }

    case actionType.LOGIN_POST_ERROR:
      return { ...state, loading: false }

    case actionType.LOGIN_GET_ADDITIONAL_ATTRIBUTES_REQUEST:
      return { ...state, loading: true }

    case actionType.LOGIN_GET_ADDITIONAL_ATRRIBUTES_SUCCESS:
      return { ...state, loading: false, company: action.payload}

    case actionType.LOGIN_GET_ADDITIONAL_ATRRIBUTES_ERROR:
      return { ...state, loading: false }


    case actionType.LOGIN_ADDITIONAL_POST_REQUEST:
      return { ...state, loading: true }

    case actionType.LOGIN_ADDITIONAL_POST_SUCCESS:
      localStorage.setItem('primaryRepresentative', action.payload.primaryRepresentative)
      return { ...state, loading: false, primaryRepresentative: action.payload.primaryRepresentative }

    case actionType.LOGIN_ADDITIONAL_POST_ERROR:
      return { ...state, loading: false }



    case actionType.OTP_GET_ATRRIBUTES_REQUEST:
      return { ...state, loading: true }

    case actionType.OTP_GET_ATRRIBUTES_SUCCESS:
      return { ...state, loading: false, otpAtrributes: action.payload }

    case actionType.OTP_GET_ATRRIBUTES_ERROR:
      return { ...state, loading: false }

    case actionType.OTP_POST_REQUEST:
      return { ...state, loading: true, otp: action.payload.otp }

    case actionType.OTP_POST_SUCCESS:
      const tokenExpiredAt = new Date().getTime() + (60000 * 45)
      const tokenB64 = Buffer.from(state.loginToken + ':' + state.otp).toString('base64')
      localStorage.setItem('token', tokenB64)
      localStorage.setItem('otpToken', action.payload.token)
      localStorage.setItem('tokenExpiredAt', tokenExpiredAt)
      return { ...state, loading: false, otpToken: action.payload.token, token: tokenB64, tokenExpiredAt }

    case actionType.OTP_POST_ERROR:
      return { ...state, loading: false }

    case actionType.SET_LOGIN_CRED:
      return { ...state, ...action.payload }

    case actionType.FLUSH_LOGIN_CRED:
      state.loginToken = null
      state.refreshToken = null
      state.otp = null
      state.otpToken = null
      state.token = null
      state.tokenExpiredAt = null
      return { ...state }

    default:
      return state
  }
}
