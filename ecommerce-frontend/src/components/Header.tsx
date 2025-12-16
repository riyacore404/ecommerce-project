import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router'
import './header.css'

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryId: string;
  }[];
}

export function Header({ cart }: HeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-Link">
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" 
          value={search} onChange={updateSearchInput} />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{ totalQuantity }</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  )
}