import React, {useState, useEffect} from 'react';
import './SalesMetrics.css';
import ProductTable from './ProductTable';
import SizeTable from './SizeTable';
import Orders from './Orders';
import CompanyPortalHeader from './CompanyPortalHeader';
import PopularFlavoursTable from './PopularFlavoursTable';


function SalesMetrics(props) {
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
  
 
  const pageChanger = () => {
    if (orders === undefined) return
    
    if (page === 'products') return <><ProductTable products={props.products}/><SizeTable products={props.products}/></>
    else if (page === 'orders') return <Orders orders={orders} currentTime={props.currentTime}/>
    else if (page === 'metrics') return <PopularFlavoursTable />
    
  }


  return (
      <div id="sales-metrics-container" page={page}>
        <CompanyPortalHeader onChange={handleChange}/>
        {pageChanger()}

      </div>
  );
}


export default SalesMetrics;
