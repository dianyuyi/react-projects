const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id != action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let tmpCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return {
      ...state,
      cart: tmpCart,
    };
  }
  if (action.type === "DECREASE") {
    let tmpCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return {
      ...state,
      cart: tmpCart,
    };
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.amount += amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === "TOGGLE_AMOUNT") {
    let tmpCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tmpCart };
  }

  throw new Error("no macthing action type");

  // another note: when use switch
  // switch (action.type) {
  //   case "CLEAR_CART":
  //     return { ...state, cart: [] };
  //   case "REMOVE":
  //     return {
  //       ...state,
  //       cart: state.cart.filter((cartItem) => cartItem.id != action.payload),
  //     };
  //   case "INCREASE":
  //     let tmpCart = state.cart.map((cartItem) => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount + 1 };
  //       }
  //       return cartItem;
  //     });
  //     return {
  //       ...state,
  //       cart: tmpCart,
  //     };

  //   case "DECREASE": // if use switch, name should change to avoid declare error
  //     let tmpCart_d = state.cart
  //       .map((cartItem) => {
  //         if (cartItem.id === action.payload) {
  //           return { ...cartItem, amount: cartItem.amount - 1 };
  //         }
  //         return cartItem;
  //       })
  //       .filter((cartItem) => cartItem.amount !== 0);
  //     return {
  //       ...state,
  //       cart: tmpCart_d,
  //     };
  // }
};

export default reducer;
