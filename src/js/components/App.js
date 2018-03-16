import React from 'react'
import Stats from 'stats.js'
import { canvasContentDimensions } from 'animation-utils'
import dat from 'dat.gui'
import animation from '../animations/basic-canvas'
import GUI from './GUI'
import Canvas from './Canvas'
import Instruments from './Instruments'
import HideShowButton from './HideShowButton'
import keyUpListener from '../utils/keyUpListener'
import windowResizeListener from '../utils/windowResizeListener'
import animator from '../animations/animator'

// ---------------------------------------------------------------------------
// Temp
// ---------------------------------------------------------------------------

const scaledCanvasDimensions = () =>
  canvasContentDimensions(window.innerWidth - 40, window.innerHeight - 80)

class Renderer extends React.PureComponent {
  constructor() {
    super()
    this.stats = new Stats()
    this.animator = animator(animation)
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
    this.animator.stop()
    this.canvas.clear()

    const scaledDimensions = scaledCanvasDimensions()
    this.setState({
      canvasWidth: scaledDimensions.width,
      canvasHeight: scaledDimensions.height,
    })
    this.startAnimation()
  }

  startAnimation = () => {
    const gui = new dat.GUI({ autoPlace: false })
    this.animator.start(this.canvasElement, gui, this.stats)
    this.setState({
      gui,
    })
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  componentDidMount() {
    this.canvasElement = this.canvas.getCanvas()
    this.startAnimation()
    this.addListeners()
  }

  componentWillUnmount() {
    this.animator.stop()
    this.keyUpListener.destroy()
  }

  addListeners = () => {
    this.windowResizeListener = windowResizeListener(this.resetAnimation)
    this.keyUpListener = keyUpListener({
      r: () => this.resetAnimation(),
      h: () => this.toggleUI(!this.state.isHidden),
      s: () => this.animator.stop(),
    })
  }

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------

  toggleUI = isHidden => {
    this.setState({
      isHidden,
    })
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
            <button id="StopButton" onClick={this.animator.stopAnimation}>
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
            <Canvas
              ref={el => {
                this.canvas = el
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
