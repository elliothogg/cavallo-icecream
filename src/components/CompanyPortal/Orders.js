import React, {useState} from 'react';
import OrdersTable from './OrdersTable';
import EachOrdersProductsTable from './EachOrdersProductsTable';

function Orders(props) {
    const [SelectedOrderID, setSelectedOrderID] = useState();

    function handleChange(orderID) {
        setSelectedOrderID(orderID);
    }

    const pageChanger = () => {
        if (SelectedOrderID)
            return <EachOrdersProductsTable onChange={handleChange} orderID={SelectedOrderID} />
        else return <OrdersTable orders={props.orders} onChange={handleChange}/>
    }
  
  return (
    <div id='orders-container'>
        {pageChanger()}
    </div>
  );
}

export default Orders;
