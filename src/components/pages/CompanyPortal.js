import React from 'react';
import './CompanyPortal.css';
import PortalLogin from '../PortalLogin';

function CompanyPortal() {
  return (
    <div id='companyPortal-container'>
      <p>Company Portal</p>
      <p>U:admin P:123456</p>
      <PortalLogin />
    </div>
  );
}

export default CompanyPortal;
