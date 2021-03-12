import React, {useEffect} from 'react';

function OrdersTable(props) {

  return (
      <div id="orders-table-container" className="container-fluid">

        <hr className="col-20" style={{ marginLeft: '0.5rem' }} />
        <div className="row"><h3 className="mb-4 col-12">ALL</h3></div>
        
        <div className="col-12">
          <div className="col-20" style={{ color: '#dddddd' }}>
            <div className="row">
              <div className="col-2">ORDER ID</div>
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

        {props.orders.slice(0).reverse().map((item, index) => {
          return (
            <div className="col-20" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-2"><button onClick={() => props.onChange(item.OrderID)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
                <div className="col-1">{item.CustomerEmail}</div>
                <div className="col-1">{item.CustomerPhone}</div>
                <div className="col-1">{item.CustomerFirstName}</div>
                <div className="col-1">{item.CustomerLastName}</div>
                <div className="col-1">{item.OrderTime}</div>
                <div className="col-1">{item.BillingAddress}</div>
                <div className="col-1">{item.BillingPostCode}</div>
                <div className="col-1">{item.TotalCost}</div>
                <div className="col-1">{item.DeliveryOrCollection}</div>
              </div>
            </div>
          );
        })}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

      </div>
  );
}

export default OrdersTable;
