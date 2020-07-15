import React from 'react';
import ReduxToastr from 'react-redux-toastr';

const Toastr = (props) => (
  <ReduxToastr
    timeOut={3000}
    newestOnTop={false}
    preventDuplicates
    position="top-right"
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    closeOnToastrClick />
)

export default Toastr