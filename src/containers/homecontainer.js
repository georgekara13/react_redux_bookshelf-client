import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBooks } from '../actions'

class HomeContainer extends Component {

  componentDidMount(){
    this.props.dispatch(getBooks())
  }

  renderItems(books){
    return books.list ? books.list.map( item => ( 'item'))
                      : null
  }

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(HomeContainer)
