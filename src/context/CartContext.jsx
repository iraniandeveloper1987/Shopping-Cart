import React, { createContext, useContext, useEffect, useReducer } from "react";
import productService from "../services/ProductsData";
const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalCount: 0,
  totalPrice: 0,
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case "Add_To_Cart": {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item === undefined) {
        return {
          ...state,
          cartItems: [...state.cartItems, { id: action.payload, quantity: 1 }],
          totalCount: state.totalCount + 1,
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalCount: state.totalCount + 1,
        };
      }
    }
    case "Remove_from_Cart": {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item !== undefined && item.quantity > 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalCount: state.totalCount - 1,
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

      //----------------------------------------------------------------------------------
      // return {
      //   ...state,
      //   cartItems: state.cartItems.map((item) =>
      //     item.id === action.payload && item.quantity > 1
      //       ? { ...cartItems, quantity: item.quantity - 1 }
      //       : state.cartItems.filter((item) => item.id !== action.payload)
      //   ),
      // };
      //-------------------------------------------------------------------------------------
    }

    case "Delete_From_Card": {
      break;
    }

    case "Get_Total_Quantities": {
      // Calculate the total count of all items in the cart
      const totalCount =
        state.cartItems?.length > 0
          ? state.cartItems?.reduce((acc, item) => acc + item.quantity, 0)
          : 0;

      return {
        ...state,
        totalCount: totalCount > 0 ? totalCount : 0,
      };
    }
    case "Get_Total_price": {
      break;
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);

  const getQuantityById = (itemId) => {
    const quantity = state.cartItems.find(
      (item) => item.id === itemId
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  return (
    <CartContext.Provider value={{ state, dispatch, getQuantityById }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
