import React from 'react';

function SizeTable(props) {

  return (
      <div id="size-table-container" className="container-fluid">

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <h3 className="mb-4 col-12">SIZES</h3>

        <div className="col-12">
          <div className="col-12" style={{ color: '#dddddd' }}>
            <div className="row">
              <div className="col-6">SIZE</div>
              <div className="col-6">PRICE</div>
            </div>
          </div>

        {props.products[0].sizeinfo.map((item, index) => {
          return (
            <div className="col-12" key={index}>
              <div className="row" style={{ color: '#333333' }}>
                <div className="col-6">{item.Size}</div>
                <div className="col-6">£{item.Price}</div>
              </div>
            </div>
          );
        })}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

      </div>
  );
}

export default SizeTable;
