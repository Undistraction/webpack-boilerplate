import React from 'react'
import Stats from 'stats.js'
import debounce from 'lodash.debounce'
import dat from 'dat.gui'
import animation from '../animations/basic-canvas'
import GUI from './GUI'
import Instruments from './Instruments'
import HideShowButton from './HideShowButton'

// ---------------------------------------------------------------------------
// Temp
// ---------------------------------------------------------------------------

const devicePixelRatio = () => window.devicePixelRatio || 1

const canvasContentDimensions = (width, height) => {
  const ratio = devicePixelRatio()
  return {
    width: width * ratio,
    height: height * ratio,
  }
}

const scaledCanvasDimensions = () =>
  canvasContentDimensions(window.innerWidth - 40, window.innerHeight - 80)

class Renderer extends React.PureComponent {
  constructor() {
    super()
    this.stats = new Stats()
    this.stats.showPanel(0)
    const scaledDimensions = scaledCanvasDimensions()
    this.state = {
      isHidden: false,
      canvasWidth: scaledDimensions.width,
      canvasHeight: scaledDimensions.height,
      title: animation.title,
    }
  }

  // ---------------------------------------------------------------------------
  // Animation
  // ---------------------------------------------------------------------------

  resetAnimation = () => {
    this.stopAnimation()
    this.clearAnimation()

    const scaledDimensions = scaledCanvasDimensions()
    this.setState({
      canvasWidth: scaledDimensions.x,
      canvasHeight: scaledDimensions.y,
    })
    this.startAnimation()
  }

  startAnimation = () => {
    // -------------------------------------------------------------------------
    // Canvas Setup
    // -------------------------------------------------------------------------
    const gui = new dat.GUI({ autoPlace: false })
    const animationTracker = animation.start(this.canvas, gui, this.stats)
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
  }

  clearAnimation = () => {
    this.canvas
      .getContext(`2d`)
      .clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  componentDidMount() {
    window.addEventListener(
      `resize`,
      debounce(this.resetAnimation, 100, { leading: true })
    )
    document.body.addEventListener(`keyup`, this.handleKeyUp, true)
    this.startAnimation()
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------

  toggleUI = isHidden => {
    this.setState({
      isHidden,
    })
  }

  handleKeyUp = event => {
    event.stopPropagation()
    switch (event.key) {
      case `r`:
        this.resetAnimation()
        break
      case `h`:
        this.toggleUI(!this.state.isHidden)
        break
      case `s`:
        this.stopAnimation()
        break
      default:
        break
    }
  }

  render() {
    return (
      <div id="App">
        <HideShowButton
          onChange={this.toggleUI}
          isHidden={this.state.isHidden}
        />
        <header id="Header" className={this.state.isHidden ? `isHidden` : ``}>
          <div id="Controls">
            <button id="StopButton" onClick={this.stopAnimation}>
              Stop [s]
            </button>
            <button id="ResetButton" onClick={this.resetAnimation}>
              Reset [r]
            </button>
          </div>
          <h1 id="Title">{this.state.title}</h1>
        </header>
        <div id="Canvas">
          <div id="Canvas-inner">
            <canvas
              ref={e => {
                this.canvas = e
              }}
              width={this.state.canvasWidth}
              height={this.state.canvasHeight}
            />
          </div>
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
