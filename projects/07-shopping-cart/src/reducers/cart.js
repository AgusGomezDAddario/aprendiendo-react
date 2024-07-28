export const initialState = [];

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case 'ADD_TO_CART': { 
      const {id} = actionPayload;
      const productInCart = state.findIndex(item => item.id === id);

      if (productInCart >= 0) {
        const newState = structuredClone(state);
        newState[productInCart].quantity += 1;
        return newState;
      } 

      return [...state, { ...actionPayload, quantity: 1 }];
    }

    case 'REMOVE_FROM_CART': {
      const {id} = actionPayload;
      return state.filter(item => item.id !== id);
    }

    case 'CLEAR_CART': {
      return initialState;
    }
  }
  return state
}