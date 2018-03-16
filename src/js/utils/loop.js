export default (stats, f) => (...args) => {
  const animationData = {}

  const { callback, destroy } = f(...args)

  const loop = () => {
    stats.begin()
    callback()
    stats.end()
    animationData.id = window.requestAnimationFrame(() => loop())
    return () => {
      destroy()
      window.cancelAnimationFrame(animationData.id)
    }
  }
  return loop()
}
