import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBooks } from '../actions'

import BookItem from '../widgetsUI/bookitem'

class HomeContainer extends Component {

  componentDidMount(){
    this.props.dispatch(getBooks(1,0))
  }

  renderItems(books){
    return books.list ? books.list.map( (item, i) => ( <BookItem {...item} key ={i}/>))
                      : null
  }

  loadMore(){
    let count = this.props.books.list.length
    this.props.dispatch(getBooks(1, count, 'asc', this.props.books.list))
  }

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div className="loadmore" onClick={this.loadMore}>Load More</div>
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
