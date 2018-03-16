export default keyMap => {
  const handleKeyUp = event => {
    event.stopPropagation()
    if (keyMap[event.key]) {
      keyMap[event.key].apply(event)
    }
  }

  const destroy = () => {
    document.body.removeEventListener(`keyup`, handleKeyUp, true)
  }

  document.body.addEventListener(`keyup`, handleKeyUp, true)

  return {
    destroy,
  }
}
