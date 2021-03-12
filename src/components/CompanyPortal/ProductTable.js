import React from 'react';

function ProductTable(props) {
  
  return (
      <div id="product-table-container" className="container-fluid">

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <h3>PRODUCTS</h3>

        <div className="col-12">
          <div className="col-12" style={{ color: '#dddddd' }}>
            <div className="row">
              <div className="col-4">PRODUCT ID</div>
              <div className="col-4">FLAVOUR</div>
              <div className="col-4">EXTRA COST</div>
            </div>
          </div>

        {props.products[0].productinfo.map((item, index) => {
          return (
            <div className="col-12" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-4">{item.ProductID}</div>
                <div className="col-4">{item.Flavour}</div>
                <div className="col-4">£{item.ExtraCost}</div>
              </div>
            </div>
          );
        })}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

      </div>
  );
}

export default ProductTable;
