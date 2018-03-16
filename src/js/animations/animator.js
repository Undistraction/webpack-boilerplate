import loop from '../utils/loop'

export default (stats, animation) => {
  const state = {}

  const start = (...args) => {
    state.destroy = loop(stats, animation)(...args)
  }

  const stop = () => {
    state.destroy()
  }

  return {
    start,
    stop,
  }
}
