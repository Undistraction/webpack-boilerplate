import { mapIndexed } from 'ramda-adjunct'

export default (context, points, close = true) => {
  const lastIdx = points.length - 1
  context.beginPath()
  mapIndexed((p, idx) => {
    if (idx === lastIdx && !close) return
    const fromPoint = points[idx]
    const toPoint = idx === lastIdx ? points[0] : points[idx + 1]
    context.moveTo(fromPoint.x, fromPoint.y)
    context.lineTo(toPoint.x, toPoint.y)
  }, points)
  context.closePath()
  context.stroke()
}
