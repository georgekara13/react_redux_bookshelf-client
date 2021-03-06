import {
  USER_LOGIN,
  USER_AUTH,
  GET_USER_POSTS,
  GET_USERS,
  USER_REGISTER
} from './types/usertype'

export default function(state={}, action){
  switch(action.type){
    case USER_LOGIN:
      return {...state, login:action.payload}
    case USER_AUTH:
      return {...state, login:action.payload}
    case GET_USER_POSTS:
      return {...state, userposts:action.payload}
    case GET_USERS:
      return {...state, userlist:action.payload}
    case USER_REGISTER:
      return {...state, register: action.payload.success, userlist: action.payload.users}
    default:
      return state
  }
}
