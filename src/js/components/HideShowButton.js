import React from 'react'
import PropTypes from 'prop-types'

class HideShowButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: props.isHidden,
    }
  }

  handleClick = () => {
    const newValue = !this.state.isHidden
    this.setState({
      isHidden: newValue,
    })
    this.props.onChange(newValue)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isHidden: nextProps.isHidden,
    })
  }

  render() {
    return (
      <button id="HideShowButton" onClick={this.handleClick}>
        {this.state.isHidden ? `Show [h]` : `Hide [h]`}
      </button>
    )
  }
}

HideShowButton.propTypes = {
  onChange: PropTypes.func,
  isHidden: PropTypes.bool,
}

export default HideShowButton
