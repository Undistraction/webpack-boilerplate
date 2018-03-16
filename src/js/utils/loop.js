export default f => (...args) => {
  const animationTracker = {}

  const callback = f(...args)

  const loop = () => {
    callback()
    animationTracker.id = window.requestAnimationFrame(() => loop())
    return animationTracker
  }
  return loop()
}
