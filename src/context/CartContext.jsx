import React, { createContext, useContext, useEffect, useReducer } from "react";
import productService from "../services/ProductsData";
const CartContext = createContext();

const initialState = {
  allProducts: [],
  cartItems: [],
  totalCount: 0,
  totalPrice: 0,
};

const cardReducer = (state, action) => {
  const productData = state.allProducts.find(
    (item) => item.id === action.payload
  );
  switch (action.type) {
    case "Add_To_Cart": {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item === undefined) {
        return {
          ...state,
          cartItems: [...state.cartItems, { id: action.payload, quantity: 1 }],
          totalCount: state.totalCount + 1,
          totalPrice: state.totalPrice + (Math.floor(productData.price) || 0),
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
          totalPrice: state.totalPrice + (Math.floor(productData.price) || 0),
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
          totalPrice: state.totalPrice - (Math.floor(productData.price) || 0),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id != action.payload),
        totalPrice:
          state.totalPrice -
          (Math.floor(productData.price) || 0) * item.quantity,
      };
    }

    case "Delete_From_Card": {
      const quantity = state.cartItems.find(
        (item) => item.id === action.payload
      )?.quantity;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id != action.payload),
        totalCount: state.totalCount - quantity,
      };
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
      // let totalAmount = 0;
      state.cartItems.map((item) => {
        const productData = productService.getProductById(item.id);
        // totalAmount += productData.price * item.quantity;
        return {
          ...state,
          totalPrice: state.totalPrice + productData.price * item.quantity,
        };
      });
    }

    case "Fetch_Products": {
      return { ...state, allProducts: action.payload.products };
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

  useEffect(() => {
    // Fetch products data when the component mounts
    productService
      .getProducts()
      .then((products) => {
        // Dispatch action to update allProducts value in state
        dispatch({
          type: "Fetch_Products",
          payload: { products },
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch, getQuantityById }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
