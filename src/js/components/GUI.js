import React from 'react'
import PropTypes from 'prop-types'

class GUI extends React.PureComponent {
  updateGui(gui) {
    this.setState({
      gui,
    })
    this.wrapper.appendChild(gui.domElement)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gui !== this.state.gui) {
      this.state.gui.destroy()
      this.wrapper.innerHTML = ``
      this.updateGui(nextProps.gui)
    }
  }

  componentDidMount() {
    if (this.props.gui) this.updateGui(this.props.gui)
  }

  componentWillUnmount() {
    this.state.gui.destroy()
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

GUI.propTypes = {
  gui: PropTypes.object,
}

export default GUI
