import React from 'react'

class Renderer extends React.Component {
  constructor({ gui }) {
    super()
    this.element = gui.domElement
  }

  componentDidMount() {
    this.wrapper.appendChild(this.element)
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div
        id="GUI"
        ref={e => {
          this.wrapper = e
        }}
      />
    )
  }
}

export default Renderer
