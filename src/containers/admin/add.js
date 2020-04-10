import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBook, clearBookForm } from '../../actions'

class AddBook extends Component {

  state = {
    formdata:{
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

  showNewBook = (book) => {
    return book.post ? <div className="conf_link">Book review for <Link to={`/books/${book.bookId}`}>{this.state.formdata.name}</Link> added succesfully! </div>
                     : null
  }

  submitForm = (event) =>  {
    //do not reload the page once we hit the submit button
    event.preventDefault()

    this.props.dispatch(addBook({
      ...this.state.formdata,
      //Remember - user info is getting passed as props from Auth() wrapper ;-)
      ownerId: this.props.user.login.id
    }))
  }

  componentWillUnmount(){
    this.props.dispatch(clearBookForm())
  }

  render() {
    return (
      <div  className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a book review</h2>
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
          { //show book submit success with link
            this.props.books.newbook ? this.showNewBook(this.props.books.newbook)
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

export default connect(mapStateToProps)(AddBook)
