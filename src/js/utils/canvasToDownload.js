import canvasToImage from './canvasToImage'

export default (canvas, mimeType) =>
  canvasToImage(canvas, mimeType).replace(mimeType, `image/octet-stream`)
