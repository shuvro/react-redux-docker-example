import React from 'react';


const ErrorComponent = (props) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>Sorry for the inconvenience</h2>
        </div>
        <a href="/">Go TO Homepage</a>
      </div>
    </div>
  )
}

export default ErrorComponent;