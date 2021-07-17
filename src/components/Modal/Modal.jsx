import { Component } from 'react'
import { createPortal } from 'react-dom'
import { Overlay, Modal } from './Modal.styles'
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal-root')

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  }

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose()
    }
  }

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Modal>
          <img src={this.props.largeImageURL} alt="" />
        </Modal>
      </Overlay>,
      modalRoot,
    )
  }
}
ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}

export default ModalWindow
