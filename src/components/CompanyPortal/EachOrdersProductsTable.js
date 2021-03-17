import React, {useState} from 'react';

function EachOrdersProductsTable(props) {

  function awaitProductsFetch() {
    if (props.eachOrdersProducts === undefined) return;

    return props.eachOrdersProducts.map((item, index) => {
      return (
          <div className="col-12" key={index}>
          <div className="row" style={{ color: '#333333' }}>
              <div className="col-3">{item.ProductID}</div>
              <div className="col-3">{item.Flavour}</div>
              <div className="col-3">{item.Size}</div>
              <div className="col-3">{item.Quantity}</div>
          </div>
          </div>
      );
      })
  }

  function awaitOrderInfoFetch() {
    if (props.orderInfo === undefined) return;
    console.log(props.orderInfo[0].DeliveryAddress);

    if (props.SelectedOrderDelivery === 'Delivery') {
      return <div className="orderType-info" ><h3 className="mb-4 col-12">DELIVERY TIME: {props.orderInfo[0].DeliveryTime}</h3>
             <h3  className="mb-4 col-12">DELIVERY ADDRESS: {props.orderInfo[0].DeliveryAddress}</h3>
             <h3 className="mb-4 col-12">DELIVERY POSTCODE: {props.orderInfo[0].DeliveryPostcode}</h3>
             <h3 className="mb-4 col-12">DRIVER INSTRUCTIONS: {props.orderInfo[0].DriverInstructions}</h3></div>
    }
    else if (props.SelectedOrderDelivery === 'Collection') {
      return <h3 className="mb-4 col-12 orderType-info">COLLECTION TIME: {props.orderInfo[0].CollectionTime}</h3>
    }
  }


    
  return (
      <div id="eachordersproducts-table-container" className="container-fluid">
        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <h3 className="mb-4 col-12">ORDER ID: {props.orderID}</h3>
        <h3 className="mb-4 col-12 orderType-info">ORDER TYPE: {props.SelectedOrderDelivery}</h3>
        <h3 className="mb-4 col-12 orderType-info">ORDER TIME: {props.orderTime}</h3>
        {awaitOrderInfoFetch()}

        <div className="col-12">
        <div className="col-12" style={{ color: '#dddddd' }}>
            <div className="row">
            <div className="col-3">PRODUCT ID</div>
            <div className="col-3">FLAVOUR</div>
            <div className="col-3">SIZE</div>
            <div className="col-3">QUANTITY</div>
            </div>
        </div>

        {awaitProductsFetch()}
        
        </div>

        <button onClick={() => props.onChange('')} style={{ color:'blue', 'textDecoration': 'underline'}}>back</button>
        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

        </div>
  );
}

export default EachOrdersProductsTable;
