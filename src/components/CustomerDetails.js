import React, { useState, useEffect } from 'react';
import './CustomerDetails.css';

function CustomerDetails(props) {
    const [customerForm, setCustomerForm] = useState(Object.assign({}, props.customerDetails));

    // true: valid; false: invalid
    const [formValidation, setFormValidation] = useState(() => {
        const initialValidation = {};
        Object.keys(customerForm).forEach((key) => {
            initialValidation[key] = true;
        });

        return initialValidation;
    });

    const validateForm = (val) => {
        if (!val.replace(/\s/g, '')) return false;
        return true;
    };
    const resetFormValidation = (key) => {
        setFormValidation((state) => ({ ...state, [key]: true }));
    };

    const invalidInputStyle = { border: '1px solid red' };

    const handleChange = (evt) => {
        const { id: key, value } = evt.target;

        // reset form field validation
        resetFormValidation(key);

        // update form field value
        setCustomerForm((state) => ({ ...state, [key]: value }));
    };
    const handleBlur = (evt) => {
        const { id: key, value } = evt.target;

        setFormValidation((state) => ({ ...state, [key]: validateForm(value) }));
    };

    // update the customerDetails state in App.js when the customerForm changed
    const { setCustomerDetails } = props;
    useEffect(() => {
        setCustomerDetails(Object.assign({}, customerForm));
    }, [customerForm, setCustomerDetails]);

    return (
        <div id="customerDetails" className="col-md-12 order-md-1">
            <h2 className="mb-3">MY DETAILS</h2>

            <form className="needs-validation" noValidate="">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="customerFirstName">First name&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerFirstName"
                            placeholder=""
                            value={customerForm.customerFirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.customerFirstName ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.customerFirstName ? {} : { display: 'block' }}
                        >
                            The first name is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="customerLastName">Last name&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerLastName"
                            placeholder=""
                            value={customerForm.customerLastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.customerLastName ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.customerLastName ? {} : { display: 'block' }}
                        >
                            The last name is required.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="customerPhone">Telephone&nbsp;</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="customerPhone"
                            placeholder=""
                            value={customerForm.customerPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.customerPhone ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.customerPhone ? {} : { display: 'block' }}
                        >
                            The telephone is required.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="customerEmail">Email&nbsp;</label>
                        <input
                            type="email"
                            className="form-control"
                            id="customerEmail"
                            value={customerForm.customerEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="ex: myname@example.com"
                            required={true}
                            style={formValidation.customerEmail ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.customerEmail ? {} : { display: 'block' }}
                        >
                            The email is required
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="billingAddress">Billing address&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="billingAddress"
                            value={customerForm.billingAddress}
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.billingAddress ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.billingAddress ? {} : { display: 'block' }}
                        >
                            The billing address is required.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="billingPostcode">Billing Postcode&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="billingPostcode"
                            value={customerForm.billingPostcode}
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.billingPostcode ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.billingPostcode ? {} : { display: 'block' }}
                        >
                            The billing postcode is required.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="deliveryAddress">Delivery address&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="deliveryAddress"
                            value={customerForm.deliveryAddress}
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.deliveryAddress ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.deliveryAddress ? {} : { display: 'block' }}
                        >
                            The delivery address is required.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="deliveryPostcode">Delivery Postcode&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="deliveryPostcode"
                            value={customerForm.deliveryPostcode}
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            style={formValidation.deliveryPostcode ? {} : invalidInputStyle}
                        />
                        <div
                            className="invalid-feedback"
                            style={formValidation.deliveryPostcode ? {} : { display: 'block' }}
                        >
                            The delivery postcode is required.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="deliveryTime">Delivery time&nbsp;</label>
                        <select
                            className="custom-select d-block w-100"
                            id="deliveryTime"
                            onChange={handleChange}
                            required={true}
                            style={formValidation.deliveryTime ? {} : invalidInputStyle}
                        >
                            <option value="asap">ASAP</option>
                        </select>
                        <div
                            className="invalid-feedback"
                            style={formValidation.deliveryTime ? {} : { display: 'block' }}
                        >
                            The delivery time is required
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="driverInstructions" className="driver-instructions">
                            Driver instructions
                            <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="driverInstructions"
                            value={customerForm.driverInstructions}
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CustomerDetails;
