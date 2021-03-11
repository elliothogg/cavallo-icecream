import React, {useState} from 'react';

function ProductTable(props) {
  const [info, setInfo] = useState({
    orderId: '205-1752345-4325359',
    orderTime: '17 July 2020',
    TotalCost: 0.0,
    Items: [
      {
          flavor: 'banana',
          size: 'Large',
          cost: '£3.22',
          count: 2
      },
      {
          flavor: 'orange',
          size: 'Small',
          cost: '£1.25',
          count: 3
      }
    ]
    })
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
