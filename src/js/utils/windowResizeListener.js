import debounce from 'lodash.debounce'

export default callback => {
  const handleWindowResize = debounce(callback, 400)

  const destroy = () => {
    window.removeEventListener(`resize`, handleWindowResize)
  }

  window.addEventListener(`resize`, handleWindowResize)

  return {
    destroy,
  }
}
