import React, { useState } from 'react';

let FIELD_NAME = '' // a global variable for showing field error

function CustomerDetails(props) {
  // TODO: receive props?
  const [customerForm, setCustomerForm] = useState({
    firstName: '',
    contactNumber: '',
    email: '',
    postcode: props.postcode || '',
    address: '',
    driverInstructions: '',
    deliveryTime: ''
  });
  const [errorStyle, setErrorStyle] = useState({ display: 'none' });

  const handleChange = (evt) => {
    const { id: key, value } = evt.target

    setCustomerForm(state => ({ ...state, [key]: value }))
  };
  const handleBlur = (evt) => {
    const { id, value } = evt.target
    FIELD_NAME = id

    setErrorStyle({ display: value.replace(/\s/g, '') ? 'none' : 'block' })
  };

  return (
    <div id="customerDetails" className="col-md-12 order-md-1">
      <h2 className="mb-3">MY DETAILS</h2>

      <form className="needs-validation" noValidate="">
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="firstName">First name</label>
            <input type="text" className="form-control"
              id="firstName"
              placeholder=""
              value={customerForm.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required={true}
            />
            <div className="invalid-feedback" style={FIELD_NAME === 'firstName' ? errorStyle : {}}>
              The first name is required.
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="contactNumber">Contact Number</label>
            <input type="text" className="form-control"
              id="contactNumber"
              placeholder=""
              value={customerForm.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              required={true}
            />
            <div className="invalid-feedback" style={FIELD_NAME === 'contactNumber' ? errorStyle : {}}>
              The contact number is required.
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="email">
              Email Address
          </label>
            <input type="email" className="form-control"
              id="email"
              value={customerForm.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
            />
            <div className="invalid-feedback" style={FIELD_NAME === 'email' ? errorStyle : {}}>
              The email address is required
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="postcode">Postcode</label>
            <input type="text" className="form-control" id="postcode"
              value={customerForm.postcode}
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              required={true}
            />
            <div className="invalid-feedback" style={FIELD_NAME === 'postcode' ? errorStyle : {}}>
              The postcode is required.
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="address">Address</label>
            <select className="custom-select d-block w-100" id="address"
              onChange={handleChange}
              required={true}
            >
              {/* TODO: dynamic options */}
              <option value="">Choose...</option>
              <option>United States</option>
            </select>
            <div className="invalid-feedback">
              The address is required
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="driverInstructions">Driver Instructions</label>
            <input type="text" className="form-control"
              id="driverInstructions"
              placeholder=""
              value={customerForm.driverInstructions}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="deliveryTime">Delivery Time</label>
            <select className="custom-select d-block w-100" id="deliveryTime"
              onChange={handleChange}
              required={true}
            >
              {/* TODO: dynamic options */}
              <option value="">ASAP</option>
              <option>One Hour</option>
              <option>Two Hours</option>
            </select>
          </div>
        </div>

        {/* <button className="btn btn-primary btn-lg btn-block" type="submit">
          Continue to checkout
        </button> */}
      </form>
    </div >
  )
}

export default CustomerDetails;