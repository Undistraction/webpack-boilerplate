import React from 'react';

export default class Application extends React.Component {

  render() {
    if (this.props.name === null) {
      return null;
    }

    return (
      <div className="App">
        <h1 className="App-title">{this.props.name}</h1>
      </div>
    );
  }
}

Application.propTypes = {
  name: React.PropTypes.string.isRequired
};
