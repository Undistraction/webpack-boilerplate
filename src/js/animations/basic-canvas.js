import { randomIntInRange, rgbaArrayToString } from 'animation-utils'
import seedrandom from 'seedrandom'
import loop from '../utils/loop'

const devicePixelRatio = () => window.devicePixelRatio || 1

const scaleValueToCanvas = v => v * devicePixelRatio()

const mouseCoordinatesInCanvas = (canvas, coordinates) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: scaleValueToCanvas(coordinates.x - rect.left),
    y: scaleValueToCanvas(coordinates.y - rect.top),
  }
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

  canvas.addEventListener(`mouseup`, e => {
    const coordinates = mouseCoordinatesInCanvas(canvas, {
      x: e.clientX,
      y: e.clientY,
    })

    state.originX = coordinates.x
    state.originY = coordinates.y
  })

  // ---------------------------------------------------------------------------
  // Cache fixed data
  // ---------------------------------------------------------------------------
  const canvasWidth = scaleValueToCanvas(canvas.clientWidth)
  const canvasHeight = scaleValueToCanvas(canvas.clientHeight)

  // ---------------------------------------------------------------------------
  // Defined fixed state
  // ---------------------------------------------------------------------------
  const context = canvas.getContext(`2d`)
  context.lineJoin = `round`
  context.lineCap = `round`

  // ---------------------------------------------------------------------------
  // Configure GUI
  // ---------------------------------------------------------------------------

  // Shadow Blur
  gui
    .add(state, `shadowBlur`)
    .min(0)
    .max(120)

  // Stroke Colour
  gui.addColor(state, `strokeColor`)

  // Allow save
  // gui.remember(state)

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return () => {
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
}

export default {
  title: `This Is The Title`,
  start: loop(start),
}
