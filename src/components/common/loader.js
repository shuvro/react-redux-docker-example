import React from 'react'
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners'


const Loader = (props) => {
  const override = css`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
  const { loading, color } = props
  return (
    <PulseLoader loading={ loading } css={override} sizeUnit={"px"} size={20} color={color}/>
  )
}

export default Loader


// export const Loader2 = (props) => {
//   const override = css`margin:10px auto; width:45px;`;
//   const { loading } = props
//   return (
//     <PulseLoader loading={ loading } css={override} sizeUnit={"px"} size={120} color={'#92491e'}/>
//   )
// }
