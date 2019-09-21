import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

interface staticInterface {
  status: number;
}
class GenericNotFound extends React.Component<any, any> {
render() {
  const { history, staticContext} = this.props;

  console.log(this.props)
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        // staticContext.status = 404;
        console.log(staticContext)
      }
      return (
        <div>
          <h1>404 : Not Found</h1>
        </div>
      )
    }}/>
  );
  }
}

export default GenericNotFound;