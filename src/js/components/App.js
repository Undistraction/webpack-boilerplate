import React from 'react'
import Stats from 'stats.js'
import debounce from 'lodash.debounce'
import dat from 'dat.gui'
import animation from '../animations/animation'
import GUI from './GUI'
import Instruments from './Instruments'
import HideShowButton from './HideShowButton'

class Renderer extends React.PureComponent {
  constructor() {
    super()
    this.stats = new Stats()
    this.stats.showPanel(0)
    this.state = {
      isHidden: false,
      canvasWidth: window.innerWidth - 40,
      canvasHeight: window.innerHeight - 80,
      title: animation.title,
    }
  }

  reset = () => {
    this.stopAnimation()
    this.setState({
      canvasWidth: window.innerWidth - 40,
      canvasHeight: window.innerHeight - 80,
    })
    this.startAnimation()
  }

  startAnimation = () => {
    // -------------------------------------------------------------------------
    // Canvas Setup
    // -------------------------------------------------------------------------
    const gui = new dat.GUI({ autoPlace: false })
    const context = this.canvas.getContext(`2d`)
    const animationTracker = animation.animate(context, {
      gui,
      stats: this.stats,
    })
    this.setState({
      animationTracker,
      gui,
    })

    // -------------------------------------------------------------------------
    // Listen For Window Resize
    // -------------------------------------------------------------------------
  }

  stopAnimation = () => {
    window.cancelAnimationFrame(this.state.animationTracker.id)
    this.canvas
      .getContext(`2d`)
      .clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  componentDidMount() {
    window.addEventListener(
      `resize`,
      debounce(this.reset, 100, { leading: true })
    )
    document.body.addEventListener(`keyup`, this.handleKeyUp, true)
    this.startAnimation()
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

  toggleUI = isHidden => {
    this.setState({
      isHidden,
    })
  }

  handleKeyUp = event => {
    event.stopPropagation()
    switch (event.key) {
      case `r`:
        this.reset()
        break
      case `h`:
        this.toggleUI(!this.state.isHidden)
        break
      default:
        break
    }
  }

  render() {
    return (
      <div id="Renderer">
        <HideShowButton
          onChange={this.toggleUI}
          isHidden={this.state.isHidden}
        />
        <header id="Header" className={this.state.isHidden ? `isHidden` : ``}>
          <button id="ResetButton" onClick={this.reset}>
            Reset
          </button>
          <h1 id="Title">{this.state.title}</h1>
        </header>
        <div id="Canvas">
          <canvas
            ref={e => {
              this.canvas = e
            }}
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
          />
        </div>
        {!this.state.isHidden && (
          <div>
            {this.state.gui && <GUI gui={this.state.gui} />}
            <Instruments stats={this.stats} id="instruments" />
          </div>
        )}
      </div>
    )
  }
}

export default Renderer
