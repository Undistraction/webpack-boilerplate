import React from 'react'
import dat from 'dat.gui'
import render from './animations/render'

class Renderer extends React.Component {
  componentDidMount() {
    // -------------------------------------------------------------------------
    // Tooling Setup
    // -------------------------------------------------------------------------

    const gui = new dat.GUI({ autoPlace: false })
    document.getElementById(`gui`).appendChild(gui.domElement)

    // -------------------------------------------------------------------------
    // Canvas Setup
    // -------------------------------------------------------------------------

    const context = this.canvas.getContext(`2d`)
    this.animationID = window.requestAnimationFrame(() => render(context, gui))
  }

  componentWillUnmount() {
    clearInterval(this.animationID)
  }

  render() {
    return (
      <div>
        <canvas
          ref={canvas => {
            this.canvas = canvas
          }}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div id="gui" />
      </div>
    )
  }
}

export default Renderer
