import { randomIntInRange } from 'animation-utils'
import seedrandom from 'seedrandom'

const randomIntInRangeSeeded = randomIntInRange(seedrandom(1))

const midPointX = context => context.canvas.clientWidth * 0.5
const midPointY = context => context.canvas.clientHeight * 0.5

const testAnimation = context => () => {
  // From Context
  const canvasWidth = context.canvas.clientWidth
  const canvasHeight = context.canvas.clientHeight
  const canvasMidX = midPointX(context)
  const canvasMidY = midPointY(context)
  // Set Context
  const strokeColor = `rgb(220, 220, 220)`
  context.strokeStyle = strokeColor
  context.lineJoin = `round`
  context.lineCap = `round`
  context.shadowBlur = 4
  context.shadowColor = strokeColor

  const render = (startX, startY) => {
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
