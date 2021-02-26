import React from 'react';
import './OrderResult.css';

function OrderResult(props) {
  // TODO: receive props data
  // const orderDetails = props

  // hard code to view the page
  const orderDetails = {
    orderDate: '17 July 2020',
    odrderNumber: '205-1752345-4325359',
    deliveryAddress: ['John', '115D LONDON 1', 'BLANDFORD SQUARE', 'XXXXX xxxx', 'United Kingdom'],
    paymentMethod: '**** 1234',
    orderSummary: {
      itemSubtotal: '￡40.20',
      postageAndPacking: '￡0.00',
      totalBeforeVAT: '￡40.20',
      VAT: '￡7.24',
      total: '￡47.44',
      grandTotal: '￡47.44'
    }
  };

  const handleTrxClick = (evt) => {
    // TODO: handle click event
    console.log('transaction click: ', evt);
  }

  return (
    <div id="orderResult" className="col-md-12">
      <h2 className="mb-3">Order Details</h2>

      <div className="mb-3">
        Ordered on {orderDetails.orderDate} |
        Order # {orderDetails.odrderNumber}
      </div>

      <div className="row row-cols-3 border" style={{ marginLeft: 0, borderRadius: '5px' }}>
        <div className="col">
          <h4>Delivery Address</h4>
          <ul>
            {
              orderDetails.deliveryAddress.map((addr, index) => <li key={index}>{addr}</li>)
            }
          </ul>
        </div>
        <div className="col">
          <h4>Payment Method</h4>
          {/* TODO: Card Icon */}
          <div>VISA {orderDetails.paymentMethod}</div>
        </div>
        <div className="col order-summary">
          <h4>Order Summary</h4>
          <ul>
            {
              Object.entries(orderDetails.orderSummary)
                .map(([key, value]) => <li key={key}>{key}: {value}</li>)
            }
          </ul>
        </div>

        <hr className="col-md-12" />

        <div className="mb-3" onClick={handleTrxClick} style={{ paddingLeft: '15PX', color: '#054cb5' }}>
          Transactions
        </div>
      </div>
    </div>
  )
}

export default OrderResult;