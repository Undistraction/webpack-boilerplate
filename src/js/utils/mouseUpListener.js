import { canvasScaleValue } from 'animation-utils'

const mouseCoordinatesInCanvas = (canvas, coordinates) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: canvasScaleValue(coordinates.x - rect.left),
    y: canvasScaleValue(coordinates.y - rect.top),
  }
}

export default (canvas, callback) => {
  const handleMouseUp = e => {
    e.stopPropagation()
    const coordinates = mouseCoordinatesInCanvas(canvas, {
      x: e.clientX,
      y: e.clientY,
    })
    callback(coordinates)
  }

  const destroy = () => {
    canvas.removeEventListener(`mouseup`, handleMouseUp)
  }

  canvas.addEventListener(`mouseup`, handleMouseUp)

  return {
    destroy,
  }
}
