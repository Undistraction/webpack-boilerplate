import {
  canvasScaleValue,
  randomIntInRange,
  rgbaArrayToString,
} from 'animation-utils'
import seedrandom from 'seedrandom'
import loop from '../utils/loop'
import mouseUpListener from '../utils/mouseUpListener'

const configureGUI = (gui, state) => {
  // Shadow Blur
  gui
    .add(state, `shadowBlur`)
    .min(0)
    .max(120)

  // Stroke Colour
  gui.addColor(state, `strokeColor`)
}

const start = (canvas, gui, stats) => {
  const state = {
    shadowBlur: 4,
    strokeColor: [220, 220, 220, 0.1],
    originX: undefined,
    originY: undefined,
  }

  const randomIntInRangeSeeded = randomIntInRange(seedrandom(1))

  // ---------------------------------------------------------------------------
  // Listeners
  // ---------------------------------------------------------------------------

  const updateOrigin = coordinates => {
    state.originX = coordinates.x
    state.originY = coordinates.y
  }

  const mouseListener = mouseUpListener(canvas, updateOrigin)

  // ---------------------------------------------------------------------------
  // Cache fixed data
  // ---------------------------------------------------------------------------
  const canvasWidth = canvasScaleValue(canvas.clientWidth)
  const canvasHeight = canvasScaleValue(canvas.clientHeight)

  // ---------------------------------------------------------------------------
  // Defined fixed state
  // ---------------------------------------------------------------------------
  const context = canvas.getContext(`2d`)
  context.lineJoin = `round`
  context.lineCap = `round`

  // ---------------------------------------------------------------------------
  // Configure GUI
  // ---------------------------------------------------------------------------

  configureGUI(gui, state)

  // Allow save
  // gui.remember(state)

  const destroy = () => {
    mouseListener.destroy()
  }

  const callback = () => {
    if (state.originX === undefined) return

    const x = randomIntInRangeSeeded(0, canvasWidth)
    const y = randomIntInRangeSeeded(0, canvasHeight)
    const strokColorString = rgbaArrayToString(state.strokeColor)

    context.shadowBlur = state.shadowBlur
    context.shadowColor = strokColorString
    context.strokeStyle = strokColorString

    stats.begin()
    context.beginPath()
    context.moveTo(state.originX, state.originY)
    context.lineTo(x, y)
    context.stroke()
    stats.end()
  }

  return {
    destroy,
    callback,
  }
}

export default {
  title: `This Is The Title`,
  start: loop(start),
}
