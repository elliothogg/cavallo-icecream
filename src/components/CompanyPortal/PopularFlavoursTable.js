import React, {useState} from 'react';

function PopularFlavoursTable(props) {
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
      <div id="popularflavours-table-container" className="container-fluid">

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <h3 className="mb-4 col-12">POPULAR FLAVOURS</h3>

        <div className="col-12">
          <div className="col-12" style={{ color: '#dddddd' }}>
            <div className="row">
              <div className="col-3">FLAVOUR</div>
              <div className="col-3">NUMBER SOLD THIS MONTH</div>
              <div className="col-3">NUMBER SOLD LAST MONTH</div>
              <div className="col-3">HOTNESS RATING</div>
            </div>
          </div>

        {info.Items.map((item, index) => {
          return (
            <div className="col-12" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-3">{item.flavor}</div>
                <div className="col-3">{item.size}</div>
                <div className="col-3">{item.cost}</div>
                <div className="col-3">{item.cost}</div>
              </div>
            </div>
          );
        })}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

      </div>
  );
}

export default PopularFlavoursTable;
