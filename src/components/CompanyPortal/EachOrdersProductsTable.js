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
    
  return (
      <div id="eachordersproducts-table-container" className="container-fluid">
        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <h3 className="mb-4 col-12">ORDER ID: {props.orderID}</h3>

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
