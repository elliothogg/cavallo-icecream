import React, {useState} from 'react';
import OrdersTable from './OrdersTable';
import EachOrdersProductsTable from './EachOrdersProductsTable';
import OrdersDateFilter from './OrdersDateFilter';

function Orders(props) {
    const [SelectedOrderID, setSelectedOrderID] = useState();
    const [SelectedOrderIDProducts, setSelectedOrderIDProducts] = useState();

    function handleChange(orderID) {
        setSelectedOrderID(orderID);
        fetch(`/api/responseEachOrdersProductsData?orderID=${orderID}`)
        .then((res)=>{
            return res.json().then((response=>{
            setSelectedOrderIDProducts(response.data);
        }))
        }).catch((error) => {
            console.error(error);
        });
    }

    const pageChanger = () => {
        if (SelectedOrderID)
            return <EachOrdersProductsTable onChange={handleChange} orderID={SelectedOrderID} eachOrdersProducts={SelectedOrderIDProducts}/>
        else return <div id="orders-table-and-date-container"><OrdersDateFilter /><OrdersTable orders={props.orders} onChange={handleChange}/></div>
    }

  return (
    <div id='orders-container'>
        {pageChanger()}
    </div>
  );
}

export default Orders;
