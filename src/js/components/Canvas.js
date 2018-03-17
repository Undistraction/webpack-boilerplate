import React from 'react'
import PropTypes from 'prop-types'
import { canvasContentDimensions } from 'animation-utils'
import windowResizeListener from '../utils/windowResizeListener'

const scaledCanvasDimensions = () =>
  canvasContentDimensions(window.innerWidth - 40, window.innerHeight - 80)

class Canvas extends React.PureComponent {
  constructor() {
    super()
    const scaledDimensions = scaledCanvasDimensions()
    this.state = {
      width: scaledDimensions.width,
      height: scaledDimensions.height,
    }
  }

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------
  clear = () => {
    console.log(`Clear`, this.state.width, this.state.height)
    this.canvas
      .getContext(`2d`)
      .clearRect(0, 0, this.state.width, this.state.height)

    const scaledDimensions = scaledCanvasDimensions()
    this.setState({
      width: scaledDimensions.width,
      height: scaledDimensions.height,
    })
  }

  getCanvas = () => this.canvas

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  componentDidMount() {
    this.windowResizeListener = windowResizeListener(this.clear)
  }

  componentWillUnmount() {
    this.windowResizeListener.destroy()
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
