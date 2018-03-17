import {
  point,
  canvasScaleValue,
  randomIntInRange,
  rgbArrayToString,
  rgbaArrayToString,
  angleToPoint,
  randomInRange,
  distanceBetweenPoints,
} from 'animation-utils'
import seedrandom from 'seedrandom'
import mouseUpListener from '../utils/mouseUpListener'
import drawPoints from '../utils/drawPoints'
import kite from '../shapes/kite'

const TYPE_LINE = `line`
const TYPE_KITE = `kite`

const TYPES = [TYPE_LINE, TYPE_KITE]

const configureGUI = (gui, state) => {
  gui
    .add(state, `shadowBlurAmount`)
    .min(0)
    .max(120)

  gui.addColor(state, `strokeColor`)

  gui
    .add(state, `maxHeight`)
    .min(0)
    .max(5000)

  gui.add(state, `type`, TYPES)
}

const start = (canvas, gui) => {
  const state = {
    shadowBlurAmount: 4,
    strokeColor: [220, 220, 220, 0.1],
    maxHeight: 5000,
    type: TYPE_LINE,
  }

  const randomIntInRangeSeeded = randomIntInRange(seedrandom(1))
  const randomInRangeSeeded = randomInRange(seedrandom(3))

  // ---------------------------------------------------------------------------
  // Listeners
  // ---------------------------------------------------------------------------

  const updateOrigin = coordinates => {
    state.origin = coordinates
  }

  const mouseListener = mouseUpListener(canvas, updateOrigin)

  // ---------------------------------------------------------------------------
  // Cache fixed data
  // ---------------------------------------------------------------------------
  const canvasWidth = canvasScaleValue(canvas.clientWidth)
  const canvasHeight = canvasScaleValue(canvas.clientHeight)

  const randomPointInCanvas = () =>
    point(
      randomIntInRangeSeeded(0, canvasWidth),
      randomIntInRangeSeeded(0, canvasHeight)
    )

  // ---------------------------------------------------------------------------
  // Defined fixed state
  // ---------------------------------------------------------------------------
  const ctx = canvas.getContext(`2d`)
  ctx.lineJoin = `round`
  ctx.lineCap = `round`

  // ---------------------------------------------------------------------------
  // Configure GUI
  // ---------------------------------------------------------------------------
  configureGUI(gui, state)

  // Allow save
  // gui.remember(state)

  // ---------------------------------------------------------------------------
  // Prep Canvas
  // ---------------------------------------------------------------------------

  const destroy = () => {
    mouseListener.destroy()
  }

  // const flag = false

  const renderLine = (fromPoint, toPoint) => {
    const strokeColorString = rgbaArrayToString(state.strokeColor)
    ctx.shadowBlurAmount = state.shadowBlurAmount
    ctx.shadowColor = strokeColorString
    ctx.strokeStyle = strokeColorString

    const distance = distanceBetweenPoints(fromPoint, toPoint)
    const lineLength = state.maxHeight >= distance ? distance : state.maxHeight
    const angle = angleToPoint(fromPoint, toPoint)
    const toX = Math.cos(angle) * lineLength
    const toY = Math.sin(angle) * lineLength

    ctx.save()
    ctx.translate(fromPoint.x, fromPoint.y)
    drawPoints(ctx, [point(0, 0), point(toX, toY)])
    ctx.restore()
  }

  const renderKite = (fromPoint, toPoint) => {
    const strokeColorString = rgbaArrayToString(state.strokeColor)
    ctx.shadowBlurAmount = state.shadowBlurAmount
    ctx.shadowColor = strokeColorString
    ctx.strokeStyle = strokeColorString

    const distance = distanceBetweenPoints(fromPoint, toPoint)
    const kiteHeight = state.maxHeight >= distance ? distance : state.maxHeight
    const kiteWidth = randomInRangeSeeded(5, 20)
    const kiteRatio = 1 - kiteWidth / kiteHeight

    ctx.save()
    ctx.translate(fromPoint.x, fromPoint.y)
    ctx.rotate(angleToPoint(fromPoint, toPoint))
    drawPoints(ctx, kite(kiteWidth, kiteHeight, kiteRatio))
    ctx.restore()
  }

  ctx.fillStyle = rgbArrayToString([17, 17, 17])
  ctx.fillRect(
    0,
    0,
    canvasScaleValue(canvas.clientWidth),
    canvasScaleValue(canvas.clientHeight)
  )

  const callback = () => {
    if (state.origin === undefined) return
    // if (flag) return
    // flag = true
    const render = state.type === TYPE_LINE ? renderLine : renderKite
    render(state.origin, randomPointInCanvas())
  }

  return {
    destroy,
    callback,
  }
}

export default {
  title: `Basic Canvas Animation`,
  start,
  instructions: `Click`,
}
