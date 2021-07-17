import { LoadMoreBtn } from './Button.styles'
import PropTypes from 'prop-types'

const Button = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button
