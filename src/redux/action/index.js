// For Add Item to Cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

// For Delete Item to Cart
export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

export const updateCartItem = (product) => {
    return {
      type: "UPDATE_CART_ITEM",
      payload: product,
    };
  };