import { getGlobalConfig, redirectToUrl } from './configAction'
import {
  getLoginAtrributes,
  postLoginForm,
  getOTPAtrributes,
  postOTPForm,
  redirectToLogin,
  isLoggedInAndRedirect,
  checkStorageLoginCred,
  getRepresentativeList,
  postLoginInfo,
  doLogout
} from './authAction'
import {
  getFormData,
  postFormData,
  updateFormFieldValue,
  autoPostFormData,
  updateAdditionalFormFieldValue,
  deleteImage,
  getAdditionalFormData,
  postAdditionalFormData,
  getAdditionalSigners,
  getSignerData,
  deleteSigner,
  cloneSigner,
  removeSigner,
  cloneRepresentative,
  removeRepresentative,
  updateRepresentativeFormFieldValue,
  getPartnerData,
  postPartnerData,
  deletePartner,
  cloneCurrency,
  removeClonedCurrency
} from './formAction'

export {
  getGlobalConfig,
  redirectToUrl,

  getLoginAtrributes,
  postLoginForm,
  getOTPAtrributes,
  postOTPForm,
  isLoggedInAndRedirect,
  redirectToLogin,
  checkStorageLoginCred,
  getRepresentativeList,
  postLoginInfo,

  getFormData,
  postFormData,
  updateFormFieldValue,
  autoPostFormData,
  updateAdditionalFormFieldValue,
  getAdditionalFormData,
  postAdditionalFormData,
  getAdditionalSigners,
  getSignerData,
  deleteSigner,
  cloneSigner,
  removeSigner,
  deleteImage,
  cloneRepresentative,
  removeRepresentative,
  updateRepresentativeFormFieldValue,

  getPartnerData,
  postPartnerData,
  deletePartner,

  cloneCurrency,
  removeClonedCurrency,

  doLogout
}
