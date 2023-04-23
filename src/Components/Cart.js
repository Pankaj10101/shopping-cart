import React, { useEffect, useState } from "react";
import { CartState } from "../Context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "./Rating";
import "./Cart.css";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => {
        return acc + Number(curr.price) * curr.qty;
      }, 0)
    );
  }, [cart]);

  const removeItem = (prod) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: prod,
    });
  };

  const changeQty =(prod, e)=>{
    dispatch({
      type:'CHANGE_CART_QTY',
      payload: {
        id:prod.id,
        qty:e.target.value
      }
    })
  }
  return (
    <div className="home">
      <div className="product-container">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.title} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.title}</span>
                </Col>
                <Col md={2}>
                  <span>{Math.floor(prod.price)}</span>
                </Col>
                <Col md={2}>
                  {" "}
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control as="select" value={prod.qty} onChange={(e)=>changeQty(prod, e)} >
                    {[...Array(prod.inStock)].map((x, i) => {
                      return <option key={i + 1}>{i + 1}</option>;
                    })}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeItem(prod)}
                  >
                    <AiFillDelete />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal({cart.length}) Items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹{Math.floor(total)}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
