import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    
    <div className='footer-container'>
     <ul id = "ul-footer">
       < div id = "com-details">
       <li>{props.companyInfo.Address} {props.companyInfo.PostCode}</li>
       <li>{props.companyInfo.Email}</li>
       <li>{props.companyInfo.Telephone}</li>
       </div>
       < div id = "opening-times">
       <li>Weekday Opening Times:</li>
       <li>{props.companyInfo.WeekdayOpeningTime} - {props.companyInfo.WeekdayClosingTime}</li>
       <li>Weekend Opening Times:</li>
       <li>{props.companyInfo.WeekendClosingTime} - {props.companyInfo.WeekendOpeningTime}</li>
       </div>
     </ul>
    </div>
  );
}

export default Footer;
