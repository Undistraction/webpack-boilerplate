import React from 'react'
import render from './animations/render'

class Renderer extends React.Component {
  componentDidMount() {
    const context = this.canvas.getContext(`2d`)
    this.animationID = window.requestAnimationFrame(render(context))
  }

  componentWillUnmount() {
    clearInterval(this.animationID)
  }

  render() {
    return (
      <canvas
        ref={canvas => {
          this.canvas = canvas
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    )
  }
}

export default Renderer
