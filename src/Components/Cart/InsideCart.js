import React from "react";
import { AiFillDelete } from "react-icons/ai";
import "./InsideCart.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const InsideCart = ({ cartData, removeItem }) => {
  return (
    <>
      {cartData.map((prod) => {
        return (
          <div  className="cartItem" key={prod.id}>
            <img src={prod.image} className="cartItemImg" alt={prod.title} />
            <div className="cartItemdetails">
              <span>{prod.title}</span>
              <span>₹{Math.round(prod.price)}</span>
            </div>
            <AiFillDelete
              fontSize="20px"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                removeItem(prod);
              }}
            />
          </div>
        );
      })}
        <Link to='/cart' >
          <Button style={{width:'95%', margin: '0 10px'}} >Go To Cart</Button>
        </Link>
    </>
  );
};

export default InsideCart;
