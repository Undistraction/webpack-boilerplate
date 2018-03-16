export default animation => {
  const state = {}

  const start = (...args) => {
    state.animationData = animation.start(...args)
  }

  const stop = () => {
    window.cancelAnimationFrame(state.animationData.id)
    state.animationData.destroy()
  }

  const reset = () => {}

  return {
    start,
    stop,
    reset,
  }
}
