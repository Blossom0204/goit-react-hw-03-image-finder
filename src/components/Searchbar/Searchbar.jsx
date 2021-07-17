import { Component } from 'react'
import { toast } from 'react-hot-toast'
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styles'
import PropTypes from 'prop-types'

export default class Searchedbar extends Component {
  state = {
    searchQuery: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.searchQuery.trim() === '') {
      toast.warn('⚠️Please enter search query name', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }
    this.props.onSubmit(this.state.searchQuery)
    this.reset()
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchQuery: value })
  }

  reset = () => {
    this.setState({ searchQuery: '' })
  }

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            autocomplete="off"
            autoFocus
            onChange={this.handleChange}
            placeholder="Search images and photos"
            type="text"
            value={this.state.searchQuery}
          />
        </SearchForm>
      </Searchbar>
    )
  }
}
Searchedbar.protoType = {
  searchQuery: PropTypes.string,
}
