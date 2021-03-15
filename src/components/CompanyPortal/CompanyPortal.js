import React, {useState, useEffect} from 'react';
import './CompanyPortal.css';
import ProductTable from './ProductTable';
import SizeTable from './SizeTable';
import Orders from './Orders';
import CompanyPortalHeader from './CompanyPortalHeader';
import PopularFlavoursTable from './PopularFlavoursTable';
import PortalLogin from './PortalLogin';
import PopularFlavoursChart from './PopularFlavoursChart';


function CompanyPortal(props) {
  const [companyPortalLoginSucess, setCompanyLoginPortalSucess] = useState(false);
  const [page, setPage] = useState('orders');
  const [orders, setOrders] = useState();


  useEffect(() => {
    fetch('/api/responseOrderData')
    .then((res)=>{
      return res.json().then((response=>{
        setOrders(response.data);
      }))
    }).catch((error) => {
      console.error(error);
    });
  }, [])
  

  function handleChange(page) {
    setPage(page);
  }

  function login() {
    setCompanyLoginPortalSucess(true);
  }
  
 
  const pageChanger = () => {
    if (companyPortalLoginSucess === false) return <PortalLogin login={login}/>;
    if (orders === undefined) return <CompanyPortalHeader onChange={handleChange}/>;
    
    if (page === 'products') return <><CompanyPortalHeader onChange={handleChange}/><ProductTable products={props.products}/><SizeTable products={props.products}/></>
    else if (page === 'orders') return <><CompanyPortalHeader onChange={handleChange}/><Orders orders={orders} currentTime={props.currentTime}/></>
    else if (page === 'metrics') return <><CompanyPortalHeader onChange={handleChange}/><PopularFlavoursTable /><PopularFlavoursChart /></>
    
  }


  return (
      <div id="sales-metrics-container" page={page}>
        
        {pageChanger()}

      </div>
  );
}


export default CompanyPortal;
