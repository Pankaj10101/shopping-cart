import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../Context/Context";

const SingleProduct = ({ data }) => {

const addToCart =()=>{
  dispatch({
    type: 'ADD_TO_CART', payload: data
  })
}

const removeFromCart = ()=>{
  dispatch(
    {
      type: 'REMOVE_FROM_CART', payload: data
    }
  )
}


const {state: {cart}, dispatch} = CartState()

  return (
    <div className="products">
      <Card>
        <Card.Img className="prod-img" variant="top" src={data.image} alt={data.title} />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle style={{ padding: 10 }}>
            <span>₹{data.price}</span>
            {data.fastDelievery ? (
              <div>fastDelievery</div>
            ) : (
              <div>4 days Delievery</div>
            )}
            <Rating rating={data.ratings} />
          </Card.Subtitle>
          {
            cart.some((p)=>p.id===data.id)?(
          <Button onClick={removeFromCart} variant="danger">Remove from Cart</Button>

            ):(
          <Button onClick={addToCart} disabled={!data.inStock}>{!data.inStock? 'Out of Stock': 'Add to Cart'}</Button>
            )
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
