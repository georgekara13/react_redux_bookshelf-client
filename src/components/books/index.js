import React, { Component } from 'react'
import { getBookWithReviewer } from '../../actions'
import { connect } from 'react-redux'

class BookView extends Component {

  componentDidMount(){
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
  }

  render() {
    return (
      <div>bookview</div>
    )
  }

}

function mapStateToProps(state){
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(BookView)
