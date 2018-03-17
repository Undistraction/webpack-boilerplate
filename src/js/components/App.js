import React from 'react'
import Stats from 'stats.js'
import dat from 'dat.gui'
import { canvasToDownload } from 'animation-utils'
import animation from '../animations/basic-canvas'
import GUI from './GUI'
import Canvas from './Canvas'
import Instruments from './Instruments'
import HideShowButton from './HideShowButton'
import keyUpListener from '../utils/keyUpListener'
import windowResizeListener from '../utils/windowResizeListener'
import animator from '../animations/animator'
import { ANIMATION_TYPES } from '../const'

// ---------------------------------------------------------------------------
// Temp
// ---------------------------------------------------------------------------

class Renderer extends React.PureComponent {
  constructor() {
    super()
    this.stats = new Stats()
    this.animator = animator(this.stats, animation.start)
    this.state = {
      isHidden: false,
      title: animation.title,
      animationType: animation.type,
    }
  }

  // ---------------------------------------------------------------------------
  // Animation
  // ---------------------------------------------------------------------------

  resetAnimation = () => {
    this.animator.stop()
    this.canvas.clear()
    this.startAnimation()
  }

  stopAnimation = () => this.animator.stop()

  startAnimation = () => {
    const gui = new dat.GUI({ autoPlace: false })

    const paramMap = {
      [ANIMATION_TYPES.BASIC_CANVAS]: this.canvasElement,
      [ANIMATION_TYPES.BASIC_SVG]: `.SVG`,
    }

    const param = paramMap[this.state.animationType]

    this.animator.start(param, gui)
    this.setState({
      gui,
    })
  }

  download = () => {
    const image = canvasToDownload(this.canvasElement, `image/jpeg`)
    window.location.href = image
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
    this.windowResizeListener.destroy()
  }

  addListeners = () => {
    this.windowResizeListener = windowResizeListener(this.resetAnimation)
    this.keyUpListener = keyUpListener({
      r: () => this.resetAnimation(),
      h: () => this.toggleUI(!this.state.isHidden),
      s: () => this.animator.stop(),
      d: () => this.download(),
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
        <header
          className={this.state.isHidden ? `App-Header isHidden` : `App-Header`}
        >
          <div className="Controls">
            <button
              className="HeaderButton StopButton"
              onClick={this.stopAnimation}
            >
              Stop
            </button>
            <button
              className="HeaderButton ResetButton"
              onClick={this.resetAnimation}
            >
              Reset
            </button>
            <button
              className="HeaderButton DownloadButton"
              onClick={this.download}
            >
              Download
            </button>
          </div>
          <h1 className="Title">{this.state.title}</h1>
        </header>
        <div className="Canvas">
          <div className="Canvas-inner">
            {this.state.animationType === ANIMATION_TYPES.BASIC_CANVAS && (
              <Canvas
                ref={el => {
                  this.canvas = el
                }}
              />
            )}
            {this.state.animationType === ANIMATION_TYPES.BASIC_SVG && (
              <div className="SVG" />
            )}
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
