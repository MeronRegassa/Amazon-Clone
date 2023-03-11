import React from "react";
import "./Product.css";
import icreCream from "../CommonResources/images/iceCream.jpg";
import { useStateValue } from "./StateProvider";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function Product({ id, title, image, price, rating }) {
  // deconstructing props
  const [{ basket }, dispatch] = useStateValue();
  console.log("thsi is the basket" + basket);

  //dispatch pushes (taking action)
  //state holds

  const addToBasket = () => {
    //  Dispatch the item  to the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating) // array.length
            .fill()
            .map(() => (
              //fills each elament with *
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
