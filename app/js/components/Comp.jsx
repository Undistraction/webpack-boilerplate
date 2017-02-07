import React from 'react';

export default class Comp extends React.Component {

  render() {
    if (this.props.name === null) {
      return null;
    }

    return (
      <div className="Comp">
        <h1 className="Comp-title">{`${this.props.name} is my name`}</h1>
      </div>
    );
  }
}

Comp.propTypes = {
  name: React.PropTypes.string.isRequired,
};
