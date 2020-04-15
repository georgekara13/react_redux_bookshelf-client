import axios from 'axios'

/*==============BOOKS==============*/

export function getBook(bookid){
  const request = axios.get(`/api/getbookbyid?id=${bookid}`)
                       .then(response => response.data)

  return {
    type: 'GET_BOOK',
    payload: request
  }
}

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

export function updateBook(data){
  const request = axios.post(`/api/updatebook`, data)
                       .then(response => response.data)

  return {
    type: 'UPDATE_BOOK',
    payload: request
  }
}

export function deleteBook(bookid){
  const request = axios.delete(`/api/deletebook?id=${bookid}`)
                       .then(response => response.data)

  return {
    type: 'DELETE_BOOK',
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

//action for clearing the update book form once we update/delete an existing book
export function clearBook(){
  return {
    type: 'CLEAR_BOOK',
    payload: {
      /*tricky situation: {} != null . If we set this to {} , the book component(./components/books.index.js)
      fails to load and the app crashes
      notice the ternary operator in that component - if we have a {} it falls in (?) and tries to return a
      component with undefined properties. OTOH by setting to null, it falls to (:) and proceeds with dispatching
      an action to fetch book data
      */
      book: null,
      updateBook: false,
      deleteSuccess: false
    }
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

export function getUsers(){
  const request = axios.get('/api/getusers')
                       .then(response => response.data)

  return {
    type: 'GET_USERS',
    payload: request
  }
}

/*we also need to update the user list on user registration
so instead of returning a payload after the request, we return a dispatch
which contains the request promise, and update the userlist with the new user
- redux thunk allows us to do so*/
export function registerUser(user, userlist){
  const request = axios.post('/api/register', user)

  return (dispatch) => {
    request.then(({data}) => {
      let response = {
        success: data.success,
        users: [...userlist, data.user]
      }

      dispatch({
        type: 'USER_REGISTER',
        payload: response
      })
    })
  }
}
