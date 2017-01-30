import React from 'react';
import Comp from './Comp';

export default class App extends React.Component {

  render() {
    if (this.props.name === null) {
      return null;
    }

    return (
      <div className="App">
        <h1 className="App-title">{this.props.name}</h1>
        <Comp name={'Comp'} />
      </div>
    );
  }
}

App.propTypes = {
  name: React.PropTypes.string.isRequired
};
