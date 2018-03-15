import React from 'react'

class Renderer extends React.Component {
  constructor({ stats }) {
    super()
    this.element = stats.dom
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
        id="Instruments"
        ref={e => {
          this.wrapper = e
        }}
      />
    )
  }
}

export default Renderer
