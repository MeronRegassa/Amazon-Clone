import React from 'react';
import "./Header.css";
import amazonLogo from "../CommonResources/images/amazonLogo.png"
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import shopingCart from "../CommonResources/images/shopping-bag copy.png"
import { Link , useNavigate} from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { auth } from '../Firebase';


function Header() {

  const navigate = useNavigate();
 const [{ basket, user}, dispatch] = useStateValue(); 
  console.log(basket.length)
console.log(user)
  
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    };
  };


  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={amazonLogo} alt="amazonLogo" />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"} className="header__classLink">
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders" className="header__classLink">
          <div className="header__option">
            <span className="header__optionLineOne">Returns </span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionalBasket">
            <ShoppingBasketOutlinedIcon />

            <span className="header__optionLineTwo header__basketCount count">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header