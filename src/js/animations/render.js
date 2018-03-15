import { randomIntInRange } from 'animation-utils'
import seedrandom from 'seedrandom'

const randomIntInRangeSeeded = randomIntInRange(seedrandom(1))

const midPointX = context => context.canvas.clientWidth * 0.5
const midPointY = context => context.canvas.clientHeight * 0.5

const testAnimation = (context, gui) => {
  // ---------------------------------------------------------------------------
  // Cache fixed data
  // ---------------------------------------------------------------------------
  const canvasWidth = context.canvas.clientWidth
  const canvasHeight = context.canvas.clientHeight
  const canvasMidX = midPointX(context)
  const canvasMidY = midPointY(context)
  const toRGBString = a =>
    `rgb(${Math.round(a[0])}, ${Math.round(a[1])}, ${Math.round(a[2])})`

  // ---------------------------------------------------------------------------
  // Defined fixed vars
  // ---------------------------------------------------------------------------
  context.lineJoin = `round`
  context.lineCap = `round`

  // ---------------------------------------------------------------------------
  // Defined tweakable vars
  // ---------------------------------------------------------------------------
  const vars = {
    shadowBlur: 4,
    strokeColor: [220, 220, 220],
  }

  // ---------------------------------------------------------------------------
  // Configure GUI
  // ---------------------------------------------------------------------------

  // Shadow Blur
  gui
    .add(vars, `shadowBlur`)
    .min(0)
    .max(120)

  // Shadow Colour
  gui.addColor(vars, `strokeColor`)
  // Allow save
  gui.remember(vars)

  const render = (startX, startY) => {
    context.shadowBlur = vars.shadowBlur
    const strokColorString = toRGBString(vars.strokeColor)
    context.shadowColor = strokColorString
    context.strokeStyle = strokColorString
    console.log(strokColorString)
    const x = randomIntInRangeSeeded(0, canvasWidth)
    const y = randomIntInRangeSeeded(0, canvasHeight)
    context.beginPath()
    context.moveTo(startX, startY)
    context.lineTo(x, y)
    context.stroke()
    window.requestAnimationFrame(() => render(x, y))
  }
  render(canvasMidX, canvasMidY)
}

export default testAnimation
