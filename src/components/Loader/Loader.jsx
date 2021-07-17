import { Component } from 'react'
import Spinner from 'react-loader-spinner'
import { LoaderContainer } from './Loader.styles'

export default class Loader extends Component {
  render() {
    return (
      <LoaderContainer>
        <Spinner
          type="Hearts"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
        />
      </LoaderContainer>
    )
  }
}
