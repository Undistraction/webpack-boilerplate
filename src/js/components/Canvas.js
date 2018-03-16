import React from 'react'
import PropTypes from 'prop-types'

class Canvas extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      width: 0,
      height: 0,
    }
  }

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------
  clear = () => {
    this.canvas
      .getContext(`2d`)
      .clearRect(0, 0, this.state.width, this.state.height)
  }

  getCanvas = () => this.canvas

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.width !== this.state.width ||
      nextProps.height !== this.state.height
    ) {
      this.setState({
        width: nextProps.width,
        height: nextProps.height,
      })
    }
  }

  render() {
    return (
      <canvas
        ref={el => {
          this.canvas = el
        }}
        width={this.state.width}
        height={this.state.height}
      />
    )
  }
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Canvas
