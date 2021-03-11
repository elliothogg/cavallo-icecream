import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <div className='footer-container'>
     <ul id = "ul-footer">
       <li>{props.companyInfo.RestaurantName}</li>
       <li>{props.companyInfo.Slogan}</li>
       <li>{props.companyInfo.Address} {props.companyInfo.PostCode}</li>
       <li>{props.companyInfo.Email}</li>
       <li>{props.companyInfo.Telephone}</li>
       <li>Weekday Opening Times</li>
       <li>{props.companyInfo.WeekdayOpeningTime} - {props.companyInfo.WeekdayClosingTime}</li>
       <li>Weekend Opening Times</li>
       <li>{props.companyInfo.WeekendClosingTime} - {props.companyInfo.WeekendOpeningTime}</li>
     </ul>
    </div>
  );
}

export default Footer;
