import React from 'react'
import Stats from 'stats.js'
import dat from 'dat.gui'
import render from '../animations/render'
import GUI from './GUI'
import Instruments from './Instruments'

class Renderer extends React.Component {
  constructor() {
    super()
    this.gui = new dat.GUI({ autoPlace: false })
    this.stats = new Stats()
    this.stats.showPanel(0)
  }

  componentDidMount() {
    // -------------------------------------------------------------------------
    // Canvas Setup
    // -------------------------------------------------------------------------

    const context = this.canvas.getContext(`2d`)
    this.animationID = window.requestAnimationFrame(() =>
      render(context, { gui: this.gui, stats: this.stats })
    )
  }

  componentWillUnmount() {
    clearInterval(this.animationID)
  }

  render() {
    return (
      <div id="Renderer">
        <h1 id="Title">This Is The Title</h1>
        <div id="Canvas">
          <canvas
            ref={e => {
              this.canvas = e
            }}
            width={window.innerWidth - 40}
            height={window.innerHeight - 80}
          />
        </div>
        <GUI gui={this.gui} />
        <Instruments stats={this.stats} id="instruments" />
      </div>
    )
  }
}

export default Renderer
