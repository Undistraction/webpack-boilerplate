export default (width, height, ratio) => {
  const halfWidth = width * 0.5
  const ratHeight = ratio * height
  return [
    { x: 0, y: 0 },
    { x: ratHeight, y: halfWidth },
    { x: height, y: 0 },
    { x: ratHeight, y: -halfWidth },
  ]
}
