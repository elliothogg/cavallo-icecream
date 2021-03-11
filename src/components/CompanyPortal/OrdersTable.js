import React, {useState, useEffect} from 'react';

function OrdersTable(props) {
  const [orders, setOrders] = useState(props.orders);

  useEffect(() => {

  })
  return (
      <div id="orders-table-container" className="container-fluid">

        <hr className="col-20" style={{ marginLeft: '0.5rem' }} />
        <h3 className="mb-4 col-12">ORDERS</h3>

        <div className="col-12">
          <div className="col-20" style={{ color: '#dddddd' }}>
            <div className="row">
              <div className="col-1">ORDER ID</div>
              <div className="col-1">CUSTOMER EMAIL</div>
              <div className="col-1">CUSTOMER PHONE</div>
              <div className="col-1">CUSTOMER FIRSTNAME</div>
              <div className="col-1">CUSTOMER LASTNAME</div>
              <div className="col-1">ORDER TIME</div>
              <div className="col-1">BILLING ADDRESS</div>
              <div className="col-1">BILLING POSTCODE</div>
              <div className="col-1">TOTAL COST</div>
              <div className="col-1">DELIVERY</div>
            </div>
          </div>
{/* 
        {orders.map((item, index) => {
          return (
            <div className="col-20" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-1"><button onClick={() => props.onChange('orderID')} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.orderID}</button></div>
                <div className="col-1">{item.CustomerEmail}</div>
                <div className="col-1">{item.CustomerPhone}</div>
                <div className="col-1">{item.CustomerFirstName}</div>
                <div className="col-1">{item.CustomerPhone}</div>
                <div className="col-1">{item.DeliveryOrCollection}</div>
                <div className="col-1">{item.OrderID}</div>
                <div className="col-1">{item.OrderTime}</div>
                <div className="col-1">{item.TotalCost}</div>
                <div className="col-1">{item.DeliveryOrCollection}</div>
              </div>
            </div>
          );
        })} */}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

      </div>
  );
}

export default OrdersTable;
