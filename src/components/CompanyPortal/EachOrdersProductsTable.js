import React, {useState} from 'react';

function EachOrdersProductsTable(props) {
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
      <div id="eachordersproducts-table-container" className="container-fluid">
        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <h3 className="mb-4 col-12">Order {props.orderID}</h3>

        <div className="col-12">
        <div className="col-12" style={{ color: '#dddddd' }}>
            <div className="row">
            <div className="col-4">PRODUCT ID</div>
            <div className="col-4">SIZE</div>
            <div className="col-4">QUANTITY</div>
            </div>
        </div>

        {info.Items.map((item, index) => {
        return (
            <div className="col-12" key={index}>
            <div className="row" style={{ color: '#333333' }}>
                <div className="col-4">{item.size}</div>
                <div className="col-4">{item.cost}</div>
                <div className="col-4">{item.cost}</div>
            </div>
            </div>
        );
        })}
        </div>

        <button onClick={() => props.onChange('')} style={{ color:'blue', 'textDecoration': 'underline'}}>back</button>
        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

        </div>
  );
}

export default EachOrdersProductsTable;
