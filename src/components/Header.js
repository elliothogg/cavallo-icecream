import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <h1>{props.restaurantName}</h1>
          <h2>{props.restaurantSlogan}</h2>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Order
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/company-portal'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Company Portal
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
