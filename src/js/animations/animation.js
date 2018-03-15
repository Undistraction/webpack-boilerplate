import { randomIntInRange } from 'animation-utils'
import seedrandom from 'seedrandom'

const midPointX = context => context.canvas.clientWidth * 0.5
const midPointY = context => context.canvas.clientHeight * 0.5

const animate = (context, { gui, stats }) => {
  const randomIntInRangeSeeded = randomIntInRange(seedrandom(1))

  // ---------------------------------------------------------------------------
  // Cache fixed data
  // ---------------------------------------------------------------------------
  const canvasWidth = context.canvas.clientWidth
  const canvasHeight = context.canvas.clientHeight
  const canvasMidX = midPointX(context)
  const canvasMidY = midPointY(context)
  const animationTracker = {
    id: null,
  }
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

  gui.destroy()

  // Shadow Blur
  gui
    .add(vars, `shadowBlur`)
    .min(0)
    .max(120)

  // Stroke Colour
  gui.addColor(vars, `strokeColor`)

  // Allow save
  // gui.remember(vars)

  let centerSwitch = false
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const loop = (startX, startY) => {
    stats.begin()
    context.shadowBlur = vars.shadowBlur
    const strokColorString = toRGBString(vars.strokeColor)
    context.shadowColor = strokColorString
    context.strokeStyle = strokColorString
    const x = centerSwitch ? randomIntInRangeSeeded(0, canvasWidth) : canvasMidX
    const y = centerSwitch
      ? randomIntInRangeSeeded(0, canvasHeight)
      : canvasMidY
    context.beginPath()
    context.moveTo(startX, startY)
    context.lineTo(x, y)
    context.stroke()
    centerSwitch = !centerSwitch
    stats.end()
    animationTracker.id = window.requestAnimationFrame(() => loop(x, y))
  }
  loop()
  return animationTracker
}

export default {
  title: `This Is The Title`,
  animate,
}
