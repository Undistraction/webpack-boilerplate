import React from 'react'

class Renderer extends React.PureComponent {
  constructor({ stats }) {
    super()
    stats.showPanel(0)
    this.element = stats.dom
    this.element.style.cssText = `cursor:pointer;opacity:0.9;z-index:10000`
  }

  componentDidMount() {
    this.wrapper.appendChild(this.element)
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
