import React, { useState, useEffect } from 'react';

let FIELD_NAME = '' // a global variable for showing field error

function Payment(props) {
  // TODO: receive props?
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: ''
  });
  const [errorStyle, setErrorStyle] = useState({ display: 'none' });

  const handleChange = (evt) => {
    const { id: key, value } = evt.target

    setPaymentForm(state => ({ ...state, [key]: value }))
  };
  const handleBlur = (evt) => {
    const { id, value } = evt.target
    FIELD_NAME = id

    setErrorStyle({ display: value.replace(/\s/g, '') ? 'none' : 'block' })
  };

  return (
    <div id="payment" className="col-md-12 order-md-1">
      <h2 className="mb-3">Payment</h2>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select className="custom-select d-block w-100" id="paymentMethod"
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          >
            {/* TODO: render option dynamically */}
            <option value="Credit">Credit card</option>
            <option value="Debit">Debit card</option>
            <option value="PayPal">PayPal</option>
          </select>
          <div className="invalid-feedback" style={FIELD_NAME === 'paymentMethod' ? errorStyle : {}}>
            The payment method is required
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="cardName">Name on card</label>
          <input type="text" className="form-control" id="cardName"
            value={paymentForm.cardName}
            placeholder=""
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          />
          <small className="text-muted">Full name as displayed on card</small>
          <div className="invalid-feedback" style={FIELD_NAME === 'cardName' ? errorStyle : {}}>
            The name on card is required
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cardNumber">Card number</label>
          <input type="text" className="form-control" id="cardNumber"
            value={paymentForm.cardNumber}
            placeholder=""
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          />
          <div className="invalid-feedback" style={FIELD_NAME === 'cardNumber' ? errorStyle : {}}>
            The credit card number is required
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input type="date" className="form-control" id="expirationDate"
            value={paymentForm.expirationDate}
            placeholder=""
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          />
          <div className="invalid-feedback" style={FIELD_NAME === 'expirationDate' ? errorStyle : {}}>
            The expiration date is required
          </div>
        </div>

      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <label htmlFor="securityCode">Security code</label>
          <input type="text" className="form-control" id="securityCode"
            value={paymentForm.securityCode}
            placeholder=""
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
          />
          <div className="invalid-feedback" style={FIELD_NAME === 'expirationDate' ? errorStyle : {}}>
            The security code is required
          </div>
        </div>
        <div className="row" style={{ marginLeft: 0, fontSize: '14px', color: '#4b4b4b' }}>
          <div className="col-md-6">
            Your security code is the last three digits from the signature
            strip on the back of your card or the four digits on the front of
            your card if you are using American Express.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;