import React from 'react';
import './CompanyPortalHeader.css';

function CompanyPortalHeader(props) {
 

  return (
    <nav id='navbar-container'>
      <h2>COMPANY PORTAL</h2>

      <ul id="companyportal-menu-items">
        <button onClick={() => props.onChange('products')}>PRODUCTS</button>
        <button onClick={() => props.onChange('orders')}>ORDERS</button>
        <button onClick={() => props.onChange('metrics')}>METRICS</button>
      </ul>
    </nav>
  );
}

export default CompanyPortalHeader;
