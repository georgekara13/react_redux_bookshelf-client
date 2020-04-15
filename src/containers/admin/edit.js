import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBook, updateBook, clearBook, deleteBook } from '../../actions'

class Editbook extends Component {

  state = {
    formdata:{
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '1',
      price: ''
    }
  }

  //listen to user input in form fields, and setstate
  //TODO add validation
  handleInput = (event, name) => {
    const newFormData = this.state.formdata
    newFormData[name] = event.target.value

    this.setState({
      formdata: newFormData
    })
  }


  submitForm = (event) =>  {
    //do not reload the page once we hit the submit button
    event.preventDefault()

    this.props.dispatch(updateBook(this.state.formdata))
  }

  deleteReview = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id))
  }

  //if user deletes post, redirect to user-reviews after 2 s
  redirectUser = () => {
    setTimeout(() => {this.props.history.push('/user/user-posts')}, 2000)
  }

  componentDidMount(){
    this.props.dispatch(getBook(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps){
    let {_id, name, author, review, pages, rating, price} = nextProps.books.book

    this.setState({
      formdata: {
        _id,
        name,
        author,
        review,
        pages,
        rating,
        price
      }
    })
  }

  componentWillUnmount(){
    this.props.dispatch(clearBook())
  }

  render() {
    let books = this.props.books
    return (
      <div  className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Edit book review</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Name"
              value={this.state.formdata.name}
              onChange={(event) => this.handleInput(event, 'name')}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Author"
              value={this.state.formdata.author}
              onChange={(event) => this.handleInput(event, 'author')}
            />
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Number of pages"
              value={this.state.formdata.pages}
              onChange={(event) => this.handleInput(event, 'pages')}
            />
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Price"
              value={this.state.formdata.price}
              onChange={(event) => this.handleInput(event, 'price')}
            />
          </div>
          <textarea
            value={this.state.formdata.review}
            placeholder="Review text"
            onChange={(event) => this.handleInput(event, 'review')}
          />
          <div className="form_element">
            <h3>Rating</h3>
            <select
              value={this.state.formdata.rating}
              onChange={(event) => this.handleInput(event, 'rating')}
            >
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>
          <button type="submit">Submit</button>
          <div className="delete_post">
            <div className="button" onClick={this.deleteReview}>
              Delete review
            </div>
          </div>
          { //show book update success with link
            books.updateBook ? <div className="edit_confirm">Book '<Link to={`/books/${books.book._id}`}>{books.book.name}</Link>' updated succesfully!</div>
                                        : null
          }
          { //show book delete success with link
            books.deleteSuccess ? <div className="red_tag">Book deleted successfully{this.redirectUser()}</div>
                                : null
          }
        </form>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(Editbook)
