import actionType from '../actions/actionTypes'
import * as _ from 'lodash'

const getAdditionalFormInitData = () => {
  return {
    1: [],
    2: [],
    3: [],
    4: [
      { 'block': { 'name': 'F. DOCUMENTO ADJUNTO OBLIGATORIO' } },
      {
        'block': {
          'name': 'Copia del documento de identificación vigente',
          'class': 'warning',
          'fields': [{
            'name': 'workDocPic',
            'type': 'UPLOAD',
            'validation': '',
            'initialValue': '',
            'isRequired': false,
            'action': '',
            'helper': '',
            'placeholder': 'Subir Imagen',
            'label': 'Subir Imagen',
            'desktopSize': 4,
            'tabletSize': 12,
            'cellphoneSize': 12
          }]
        }
      }],
    5: [],
    6: [],
    new: []
  }
}

const initialState = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  additional: getAdditionalFormInitData(),
  signers: [],
  partners: [],
  single_signer: null,
  single_partner: [],
  loading: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_FORM_REQUEST:
      return { ...state, loading: true }

    case actionType.GET_FORM_SUCCESS:
      const { step, data, additional } = action.payload
      if (additional) {
        let a_data = data
        // if (a_data[0]) {
        //   a_data.forEach((blocks, bi) => {
        //     if (blocks.block && blocks.block.fields) {
        //       blocks.block.fields.forEach((field, fi) => {
        //         if (['switch', 'checkbox'].includes(field.type.toLowerCase())) {
        //           a_data[bi].block.fields[fi].isSelected = false
        //         } else {
        //           a_data[bi].block.fields[fi].initialValue = ''
        //         }
        //       })
        //     }
        //   })
        // }
        state.additional[step] = a_data
      } else {
        state[step] = data
      }
      return { ...state, loading: false }

    case actionType.GET_FORM_ERROR:
      return { ...state, loading: false }

    case actionType.POST_FORM_REQUEST:
      return { ...state, loading: true }

    case actionType.POST_FORM_SUCCESS:
      return { ...state, loading: false }

    case actionType.POST_FORM_ERROR:
      return { ...state, loading: false }

    case actionType.AUTO_POST_FORM_REQUEST:
      return state

    case actionType.AUTO_POST_FORM_SUCCESS:
      return state

    case actionType.AUTO_POST_FORM_ERROR:
      return state

    case actionType.UPDATE_FORM_FIELD_VALUE:
      const { step: _step, field: fieldName, value, type } = action.payload
      state[_step].forEach(blocks => {
        if (blocks.block && blocks.block.fields) {
          blocks.block.fields.forEach(field => {
            if (field.name === fieldName) {
              field.initialValue = value
              if (['switch', 'checkbox'].includes(type.toLowerCase())) {
                field.isSelected = value
              } else if (type === 'UPLOAD') {
                field.attached = {}
              }
              return
            }
          })
        }
      })
      return { ...state }

    case actionType.UPDATE_ADDITIONAL_FORM_FIELD_VALUE:
      const { step: a_step, field: a_fieldName, value: a_value, type: a_type, blockIndex } = action.payload
      state.additional[a_step][blockIndex].block.fields.forEach(field => {
        if (field.name === a_fieldName) {
          field.initialValue = a_value
          if (['switch', 'checkbox'].includes(a_type.toLowerCase())) {
            field.isSelected = a_value
          }
          return
        }
      })
      return { ...state }

    case actionType.UPDATE_REPRESENTATIVE_FORM_FIELD_VALUE:
      const { step: a1_step, field: a1_fieldName, value: a1_value, type: a1_type, blockIndex1 } = action.payload
      state[a1_step][blockIndex1].block.fields.forEach(field => {
        if (field.name === a1_fieldName) {
          field.initialValue = a1_value
          if (['switch', 'checkbox'].includes(a1_type.toLowerCase())) {
            field.isSelected = a1_value
          }
          return
        }
      })
      return { ...state }

    case actionType.ADDITIONAL_FORM_POST_SUCCESS:
      state.additional = getAdditionalFormInitData()
      return { ...state, loading: false }

    case actionType.GET_SIGNERS_SUCCESS:
      state.signers = action.payload.data
      state.loading = false
      return { ...state }

    case actionType.GET_SINGLE_SIGNER_SUCCESS:
      state.single_signer = action.payload.data
      state.loading = false
      return { ...state }

    case actionType.DELETE_SIGNER_SUCCESS:
      state.loading = false
      return { ...state }


    case actionType.GET_PARTNER_SUCCESS:
      state.partners = action.payload.data
      state.loading = false
      return { ...state }


    case actionType.DELETE_PARTNER_SUCCESS:
      state.loading = false
      return { ...state }

    case actionType.CLONE_SIGNER_BLOCK:
      state.loading = false
      const lastIndex = state.additional.new.length - 1
      let clonedBlock = _.cloneDeep(state.additional.new[lastIndex])
      state.additional.new.push(clonedBlock)
      state.additional.new[lastIndex + 1].block.fields.map((field, fieldIndex) => {
        field.initialValue = ''
      })
      return { ...state }

    case actionType.REMOVE_SIGNER_BLOCK:
      let removeIndex = action.bIndex
      state.loading = false
      return { ...state, ...state.additional.new.splice(removeIndex, 1) }

    case actionType.CLONE_REPRESENTATIVE_BLOCK:
      state.loading = false
      let stateDuplicate = _.cloneDeep(state[2])
      let copyState = stateDuplicate.splice(1, 4)
      copyState.forEach(blocks => {
        state[2].push(blocks)
        let stateLength = state[2].length - 1
        state[2][stateLength].block.fields.map((field, fieldIndex) => {
          field.initialValue = ''
        })
      })
      return { ...state }

    case actionType.REMOVE_REPRESENTATIVE_BLOCK:
      let removeRep = action.bIndex
      state.loading = false
      let removed = state[2].splice(removeRep, 4)
      return { ...state }

    case actionType.REMOVE_IMAGE_PREVIEW:
      let removeImage = action.bIndex
      let removeActionStep = action.stepIndex
      let removeImageName = action.imageName
      state.loading = false
      let deleteImageIndex = state[removeActionStep][removeImage].block.fields[0].attached
      let imageCounter = 0
      deleteImageIndex.forEach(image => {
        if (image.filename === removeImageName) {
          state[removeActionStep][removeImage].block.fields[0].attached.splice(imageCounter, 1)
        }
        imageCounter++
      })
      return { ...state }

    // case actionType.CLONE_CURRENCY:
    //   let {bIndex: cloneIndex, stepIndex: cloneStep} = action.payload;
    //   state.loading = false
    //   let clonedField = _.cloneDeep(state[cloneStep][cloneIndex].block.fields[0]);
    //   clonedField.initialValue = ""
    //   state[cloneStep][cloneIndex].block.fields.push(clonedField)
    //   return { ...state }
    //
    // case actionType.REMOVE_CLONE_CURRENCY:
    //   let {bIndex: removeCloneIndex, stepIndex: removeCloneStep, fieldIndex: removeFieldIndex} = action.payload;
    //   state.loading = false
    //   state[removeCloneStep][removeCloneIndex].block.fields.splice(removeFieldIndex, 1);
    //   return { ...state }

    default:
      return state
  }
}
