//initiating our initial state
export const initialState = {
  basket: [],
    user: null,
};

// Selector
// export const getBasketTotal = (basket) =>
//   basket?.reduce((amount, item) => item.price + amount, 0);

//reducer is our listener
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    
    
    // emptys the basket after successfull payment
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };
    
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in the basket`
        );
      }
      return {
        ...state, //spread operator copies whats in the state
        basket: newBasket,
      };
    //user login listener
    case 'SET_USER':
      return {
        ...state, 
        user: action.user,
      }
    default:
      return state;
  }
};

export default reducer;
