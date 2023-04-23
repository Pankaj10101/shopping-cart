import React, { useState } from "react";
import Rating from "./Rating";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../Context/Context";

const Filters = () => {
        
        const {productState:{byStock, byFastDelievery, sort, byRating}, productDispatch} = CartState()
        const filterByRating = (i)=>{
          productDispatch({
            type:'FILTER_BY_RATING',
            payload: i+1
          })
        }
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id="inline-1"
          onChange={()=>{
            productDispatch({
              type:'SORT_BY_PRICE',
              payload:'lowToHigh'
            })
          }}
          checked={sort==='lowToHigh'?true:false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Desending"
          name="group1"
          type="radio"
          id="inline-2"
          onChange={()=>{
            productDispatch({
              type:'SORT_BY_PRICE',
              payload:'highToLow'
            })
          }}
          checked={sort==='highToLow'?true:false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id="inline-3"
          onChange={()=>productDispatch({
            type:'BY_STOCK'
          })}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delievery"
          name="group1"
          type="checkbox"
          id="inline-4"
          onChange={()=>productDispatch({
            type:'FILTER_BY_DELIEVERY'
          })}
          checked={byFastDelievery}
        />
      </span>
      <span>
        <label style={{paddingRight :10}} >Rating :</label>
        <Rating rating={byRating} style ={{cursor:"pointer"}} onClick={filterByRating} />
      </span>
      <Button variant='light' onClick={()=>{
        productDispatch({
          type:'CLEAR_FILTER'
        })
      }} >Clear Filters</Button>
    </div>
  );
};

export default Filters;
