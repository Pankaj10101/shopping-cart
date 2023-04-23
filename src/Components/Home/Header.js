import React from "react";
import { FaCartPlus } from "react-icons/fa";
import {
  Container,
  Dropdown,
  FormControl,
  Navbar,
  Nav,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";
import InsideCart from '../Cart/InsideCart'
const Header = () => {
  const {
    state: { cart }, dispatch, productDispatch
  } = CartState();

  const removeItemFromCart =(prod)=>{
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: prod
    })
  }

  const filterBySearch =(e)=>{
    productDispatch({
      type:'FILTER_BY_SEARCH',
      payload:e.target.value
    })
  }
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e)=>filterBySearch(e)}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align='start' >
            <Dropdown.Toggle variant="success">
              <FaCartPlus color="white" fontSize="25px" />
              <Badge bg="none">{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu align='start'   style={{ minWidth: 270 }}>{cart.length > 0 ? (
                <InsideCart cartData={cart} removeItem={removeItemFromCart} />
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
