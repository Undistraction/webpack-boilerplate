import { filter } from 'ramda'

const MIME_TYPES = [
  `image/png`,
  `image/bmp`,
  `image/gif`,
  `image/jpeg`,
  `image/tiff`,
]

export default canvas =>
  filter(mimeType => canvas.toDataURL(mimeType).search(mimeType) >= 0)(
    MIME_TYPES
  )
