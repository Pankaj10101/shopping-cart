import { CartState } from "../Context/Context";
import SingleProduct from "./SingleProduct";
import "./Home.css";
import Filters from "./Filters";
import { FaSortNumericDown } from "react-icons/fa";
const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelievery, sort, byRating, searchQuery },
  } = CartState();
  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) => sort==='lowToHigh'? a.price - b.price:b.price-a.price);
    } 
    if(!byStock){
      sortedProducts= sortedProducts.filter((prod)=>prod.inStock)
    }
    if(byFastDelievery){
      sortedProducts=sortedProducts.filter((prod)=>prod.fastDelievery)
    }
    if(byRating){
      sortedProducts= sortedProducts.filter((prod)=>prod.ratings>=byRating)
    }
    if(searchQuery){
      sortedProducts=sortedProducts.filter((prod)=>prod.title.toLowerCase().includes(searchQuery))
    }
    return sortedProducts
  };
  return (
    <div className="home">
      <Filters />
      <div className="products-container">
        {transformProducts().map((item) => (
          <SingleProduct data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
