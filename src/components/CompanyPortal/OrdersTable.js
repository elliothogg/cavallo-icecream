import React, {useEffect} from 'react';

function OrdersTable(props) {

  function checkIfDateBetween(startDate, endDate, dateToCheck) {
    let d1 = startDate.split("/");
    let d2 = endDate.split("/");
    let c = dateToCheck.split("/");

    let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    let check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return (check >= from && check <= to)
  }

  function displayCustomRangeDates() {
    if (props.ordersToShow === "Custom:") {
      if (props.startDate === undefined) return <h3 id="custom-date-info">Please select a start date</h3>;
      if ( !(props.startDate === undefined) && (props.endDate === undefined) ) return <h3 id="custom-date-info">{props.startDate}</h3>;
      if ( !(props.startDate === undefined) && !(props.endDate === undefined) ) return <h3 id="custom-date-info">{props.startDate} - {props.endDate}</h3>;
    }
    
  }

  function showOrders() {
    if (props.ordersToShow === "All") {
      return props.orders.slice(0).reverse().map((item, index) => {
        return (
          <div className="col-20" key={index}>
            <div className="row" style={{ color: '#333333' }}>
              <div className="col-2"><button onClick={() => props.onChange(item.OrderID, item.DeliveryOrCollection, item.OrderTime)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
              <div className="col-2">{item.CustomerEmail}</div>
              <div className="col-1">{item.CustomerPhone}</div>
              <div className="col-1">{item.CustomerFirstName}</div>
              <div className="col-1">{item.CustomerLastName}</div>
              <div className="col-1">{item.OrderTime}</div>
              <div className="col-1">{item.BillingAddress}</div>
              <div className="col-1">{item.BillingPostcode}</div>
              <div className="col-1">£{item.TotalCost}</div>
              <div className="col-1">{item.DeliveryOrCollection}</div>
            </div>
          </div>
        );
      })
    }
    else if (props.ordersToShow === "Today") {
      return props.orders.slice(0).reverse().map((item, index) => {
        if (item.OrderTime.slice(0,8) === props.todaysDate)
          return (
            <div className="col-20" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-2"><button onClick={() => props.onChange(item.OrderID, item.DeliveryOrCollection, item.OrderTime)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
                <div className="col-2">{item.CustomerEmail}</div>
                <div className="col-1">{item.CustomerPhone}</div>
                <div className="col-1">{item.CustomerFirstName}</div>
                <div className="col-1">{item.CustomerLastName}</div>
                <div className="col-1">{item.OrderTime}</div>
                <div className="col-1">{item.BillingAddress}</div>
                <div className="col-1">{item.BillingPostcode}</div>
                <div className="col-1">£{item.TotalCost}</div>
                <div className="col-1">{item.DeliveryOrCollection}</div>
              </div>
            </div>
          );
      })
    }
    else if (props.ordersToShow === "This Week") {
      return props.orders.slice(0).reverse().map((item, index) => {
        if ( checkIfDateBetween(props.startOfWeekDate, props.endOfWeekDate, item.OrderTime.slice(0,10)) )
          return (
            <div className="col-20" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-2"><button onClick={() => props.onChange(item.OrderID, item.DeliveryOrCollection, item.OrderTime)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
                <div className="col-2">{item.CustomerEmail}</div>
                <div className="col-1">{item.CustomerPhone}</div>
                <div className="col-1">{item.CustomerFirstName}</div>
                <div className="col-1">{item.CustomerLastName}</div>
                <div className="col-1">{item.OrderTime}</div>
                <div className="col-1">{item.BillingAddress}</div>
                <div className="col-1">{item.BillingPostcode}</div>
                <div className="col-1">£{item.TotalCost}</div>
                <div className="col-1">{item.DeliveryOrCollection}</div>
              </div>
            </div>
          );
      })
    }
    else if (props.ordersToShow === "This Month") {
      return props.orders.slice(0).reverse().map((item, index) => {
        if (item.OrderTime.slice(3,8) === props.todaysDate.slice(3))
          return (
            <div className="col-20" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-2"><button onClick={() => props.onChange(item.OrderID, item.DeliveryOrCollection, item.OrderTime)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
                <div className="col-2">{item.CustomerEmail}</div>
                <div className="col-1">{item.CustomerPhone}</div>
                <div className="col-1">{item.CustomerFirstName}</div>
                <div className="col-1">{item.CustomerLastName}</div>
                <div className="col-1">{item.OrderTime}</div>
                <div className="col-1">{item.BillingAddress}</div>
                <div className="col-1">{item.BillingPostcode}</div>
                <div className="col-1">£{item.TotalCost}</div>
                <div className="col-1">{item.DeliveryOrCollection}</div>
              </div>
            </div>
          );
      })      
    }
    else if (props.ordersToShow === "Custom:") {
      if (props.startDate === undefined) {
        return
      }
      else if ( !(props.startDate === undefined) && (props.endDate === undefined) ) {
        return props.orders.slice(0).reverse().map((item, index) => {
          if (item.OrderTime.slice(0,10) === props.startDate)
            return (
              <div className="col-20" key={index}>
                <div className="row" style={{ color: '#333333' }}>
                  <div className="col-2"><button onClick={() => props.onChange(item.OrderID, item.DeliveryOrCollection, item.OrderTime)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
                  <div className="col-2">{item.CustomerEmail}</div>
                  <div className="col-1">{item.CustomerPhone}</div>
                  <div className="col-1">{item.CustomerFirstName}</div>
                  <div className="col-1">{item.CustomerLastName}</div>
                  <div className="col-1">{item.OrderTime}</div>
                  <div className="col-1">{item.BillingAddress}</div>
                  <div className="col-1">{item.BillingPostcode}</div>
                  <div className="col-1">£{item.TotalCost}</div>
                  <div className="col-1">{item.DeliveryOrCollection}</div>
                </div>
              </div>
            );
        })
      }
      else if ( !(props.startDate === undefined) && !(props.endDate === undefined) ) {
        return props.orders.slice(0).reverse().map((item, index) => {
          if ( checkIfDateBetween(props.startDate, props.endDate, item.OrderTime.slice(0,10)) )
            return (
              <div className="col-20" key={index}>
                <div className="row" style={{ color: '#333333' }}>
                  <div className="col-2"><button onClick={() => props.onChange(item.OrderID, item.DeliveryOrCollection, item.OrderTime)} style={{ color:'blue', 'textDecoration': 'underline'}}>{item.OrderID}</button></div>
                  <div className="col-2">{item.CustomerEmail}</div>
                  <div className="col-1">{item.CustomerPhone}</div>
                  <div className="col-1">{item.CustomerFirstName}</div>
                  <div className="col-1">{item.CustomerLastName}</div>
                  <div className="col-1">{item.OrderTime}</div>
                  <div className="col-1">{item.BillingAddress}</div>
                  <div className="col-1">{item.BillingPostcode}</div>
                  <div className="col-1">£{item.TotalCost}</div>
                  <div className="col-1">{item.DeliveryOrCollection}</div>
                </div>
              </div>
            );
        })
      }    
    }
  }

  return (
      <div id="orders-table-container" className="container-fluid">

        <hr className="col-20" style={{ marginLeft: '0.5rem' }} />

        <div className="col-20">
            <div className="row" >
              <div className="col-2"><h3 className="mb-4 col-12">{props.ordersToShow}</h3></div>
              <div className="col-5">{displayCustomRangeDates()}</div>
            </div>
          </div>

        <div className="row"></div>
        
        <div className="col-12">
          <div className="col-20" style={{ color: '#dddddd' }}>
            <div className="row" >
              <div className="col-2">ORDER ID</div>
              <div className="col-2">CUSTOMER EMAIL</div>
              <div className="col-1">CUSTOMER PHONE</div>
              <div className="col-1">CUSTOMER FIRSTNAME</div>
              <div className="col-1">CUSTOMER LASTNAME</div>
              <div className="col-1">TIME PLACED</div>
              <div className="col-1">BILLING ADDRESS</div>
              <div className="col-1">BILLING POSTCODE</div>
              <div className="col-1">TOTAL COST</div>
              <div className="col-1">DELIVERY</div>
            </div>
          </div>

        {showOrders()}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

      </div>
  );
}

export default OrdersTable;
