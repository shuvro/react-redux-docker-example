import actionType from './actionTypes'
import { axiosRequest } from '../utils/api'
import { push } from 'connected-react-router'
import ROUTES from '../utils/routes';

const globalConfigRequest = () => ({ type: actionType.GLOBAL_CONFIG_REQUEST })
const globalConfigSuccess = (payload) => ({ type: actionType.GLOBAL_CONFIG_SUCCESS, payload })
const globalConfigError = () => ({ type: actionType.GLOBAL_CONFIG_ERROR })

const GLOBAL_CONIG_URL = '/forms/v1/KYCJuridico/getSite/' + process.env.REACT_APP_CLIENT_ID + '/' + process.env.REACT_APP_CLIENT_SECRET;

export const getGlobalConfig = () => {
  return (dispatch) => {
    dispatch(globalConfigRequest())

    axiosRequest.get(GLOBAL_CONIG_URL)
      .then(response => {
        dispatch(globalConfigSuccess(response.data))
      })
      .catch(error => {
        console.log(error.response)
        dispatch(globalConfigError())
        dispatch(push(ROUTES.ERROR));
      })
  }
}

export const redirectToUrl = (URL) => {
  return (dispatch) => {
    dispatch(push(URL))
  }
}
