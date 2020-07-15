import actionType from "../actions/actionTypes"

const initialState = {
  form: null,
  baseColor: '',
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GLOBAL_CONFIG_REQUEST:
      return { ...state, loading: true }

    case actionType.GLOBAL_CONFIG_SUCCESS:
      const form = action.payload.form;
      return { ...state, loading: false, form: form, baseColor: form.marketing.style['base-color'] }

    case actionType.GLOBAL_CONFIG_ERROR:
      return { ...state, loading: false }

    default:
      return state
  }
}