import {combineReducers} from 'redux'

import {UPDATE_USER, UPDATE_CART} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CART) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CART:
      return merge(state, {prevContact: action.payload})
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  cartItems: contactReducer,
})

export default reducer
