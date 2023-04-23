import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { cartReducer, productReducer } from "./Reducer";

const Cart = createContext();

const Context = (props) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const [productState, productDispatch]= useReducer(productReducer, {
    byStock:false,
    byFastDelievery:false,
    byRating:0,
    searchQuery:""
  })
  

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=20")
      .then((res) => {
        const response = res.data;
        const products = response.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            inStock: Math.floor(Math.random() * 9),
            fastDelievery: Math.random() < 0.5,
            ratings: Math.floor(Math.random() * 6),
          };
        });
        dispatch({ type: "SET_PRODUCTS", payload: products });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{props.children}</Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
