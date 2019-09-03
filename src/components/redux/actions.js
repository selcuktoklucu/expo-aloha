// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CART = 'UPDATE_CART'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addToCart = newItem => ({
  type: UPDATE_CART,
  payload: newItem,
})
