import axios from 'axios'

/*==============BOOKS==============*/

export function getBooks(limit = 10, start = 0, order = 'asc', list = ''){
  const request = axios.get(`/api/getbooks?limit=${limit}&skip=${start}&order=${order}`)
                       .then(response => {
                              if(list){
                                return [...list,...response.data]
                              }
                              else{
                                return response.data
                              }
                            })
  return {
    type: 'GET_BOOKS',
    payload: request
  }
}

export function getBookWithReviewer(id){
  const request = axios.get(`/api/getbookbyid?id=${id}`)

  //redux thunk in action - wait to get data from first request
  //then proceed with another request to get owner info
  return (dispatch) => {
    request.then(({data}) => {
      let book = data

      axios.get(`/api/getreviewerbyid?id=${book.ownerId}`)
           .then(({data}) => {
             let response = {
               book,
               reviewer: data
             }

             dispatch({
               type: 'GET_BOOK_W_REVIEWER',
               payload: response
             })
           })
    })
  }
}

/*extra action for clearing the book state if component unmounts - this ensures that
we won't display the previous book info on the next component mounting,
on slow internet connections - we prefer to show empty views, rather that incorrect data*/
export function clearBookWithReviewer(){
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  }
}

export function addBook(book){
  const request = axios.post('/api/addbook', book)
                       .then(response => response.data)

  return {
    type: 'ADD_BOOK',
    payload: request
  }
}

//action for clearing the book form once we add a new book
export function clearBookForm(){
  return {
    type: 'CLEAR_BOOK_FORM',
    payload: {}
  }
}

/*==============USER==============*/

export function loginUser({email, password}){
  const request = axios.post('/api/login', {email, password})
                       .then(response => response.data)

  return {
    type: 'USER_LOGIN',
    payload: request
  }
}

export function auth(){
  const request = axios.get('/api/userisauth')
                       .then(response => response.data)

  return {
    type: 'USER_AUTH',
    payload: request
  }
}

export function getUserPosts(ownerId){
  const request = axios.get(`/api/userposts?user=${ownerId}`)
                       .then(response => response.data)

  return {
    type: 'GET_USER_POSTS',
    payload: request
  }
}
