export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].qty += 1;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...state.cart, { ...action.payload, qty: 1 }])
        );
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.cart.filter((c) => c.id !== action.payload.id)
        )
      );
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      const cart = state.cart.map((c) =>
        c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart: cart,
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return {
        ...state,
        sort: action.payload,
      };
    case "BY_STOCK":
      const newByStock = !state.byStock;
      localStorage.setItem("byStock", newByStock);
      return {
        ...state,
        byStock: newByStock,
      };
    case "FILTER_BY_DELIEVERY":
      const newByFastDelievery = !state.byFastDelievery;
      localStorage.setItem("byFastDelievery", newByFastDelievery);
      return {
        ...state,
        byFastDelievery: newByFastDelievery,
      };
    case "FILTER_BY_RATING":
      localStorage.setItem("byRating", action.payload);
      return {
        ...state,
        byRating: action.payload,
      };
    case "FILTER_BY_SEARCH":
      localStorage.setItem("searchQuery", action.payload);
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "CLEAR_FILTER":
      localStorage.removeItem("byStock");
      localStorage.removeItem("byFastDelievery");
      localStorage.removeItem("byRating");
      localStorage.removeItem("searchQuery");
      return {
        byStock: false,
        byFastDelievery: false,
        byRating: 0,
        searchQuery: "",
      };
    default:
      return state;
  }
};
