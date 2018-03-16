export default f => (...args) => {
  const animationData = {}

  const { callback, destroy } = f(...args)

  animationData.destroy = destroy

  const loop = () => {
    callback()
    animationData.id = window.requestAnimationFrame(() => loop())
    return animationData
  }
  return loop()
}
