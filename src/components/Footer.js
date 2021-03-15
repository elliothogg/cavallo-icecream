import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    
    <div className='footer-container'>
    
      
       <div id = "address">
       <p id = "address-title">Address : </p>
       <p id = "address-details">{props.companyInfo.Address} {props.companyInfo.PostCode}</p>
       </div>

       <div id = "contact">
       <p id = "contact-us"> Contact Us:</p>
       <p id = "email">{props.companyInfo.Email}</p>
       <p id = "tele">{props.companyInfo.Telephone}</p>
       </div>
       
       
       <div id = "opening-hours">
       <p id = "weekday">Weekday Opening Times: {props.companyInfo.WeekdayOpeningTime} - {props.companyInfo.WeekdayClosingTime}</p>
       <p id = "weekend">Weekend Opening Times: {props.companyInfo.WeekendOpeningTime} - {props.companyInfo.WeekendClosingTime}</p>
       </div>

    </div>
  );
}

export default Footer;
