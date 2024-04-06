import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const Cart = createContext();

const Context = ({ children }) => {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //     });
  // }, []);
  return <Cart.Provider value={null}>{children}</Cart.Provider>;
};

export default Context;

// export const products =
