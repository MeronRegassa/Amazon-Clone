import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format"
import ShoppingBasketOutlined from '@mui/icons-material/ShoppingBasketOutlined';
import { useStateValue } from './StateProvider';
import {useNavigate} from 'react-router-dom'

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue()


  const getBasketTotal= (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);
  // reducer method takes two arguments (accumulator and item)
  const  clikHandler = (e) => {
    navigate('/payment')
}


  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(
          value //renders the values as a text.
        ) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order conatins a gift
            </small>
          </>
        )}
        decimalScale={2} //go upto two decimal places
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true} //adds comma on thousands
        prefix={"$"}
      />

      <button onClick={clikHandler}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;