import React, { useState, useEffect, useImperativeHandle } from 'react';
import './CustomerDetails.css';

function CustomerDetails(props, ref) {
    const [customerForm, setCustomerForm] = useState(Object.assign({}, props.customerDetails));

    // true: valid; false: invalid
    const [formValidation, setFormValidation] = useState(() => {
        const initialValidation = {};
        Object.keys(customerForm).forEach((key) => {
            initialValidation[key] = true;
        });

        delete initialValidation.driverInstructions;

        return initialValidation;
    });

    const validateField = (val) => {
        if (!val.replace(/\s/g, '')) return false;
        return true;
    };
    const validateCustomerForm = () => {
        const formData = Object.assign({}, customerForm);
        delete formData.driverInstructions;
        return Object.values(formData).every((fieldVal) => fieldVal);
    };
    const resetFormValidation = (key) => {
        setFormValidation((state) => ({ ...state, [key]: true }));
    };

    const invalidInputStyle = { border: '1px solid red' };

    const { WeekdayClosingTime, WeekendClosingTime } = props.companyInfo;
    const deliveryTimeOpts = generateDeliveryTimeOpts(
        isWeekend() ? WeekendClosingTime : WeekdayClosingTime
    );

    const handleChange = (evt) => {
        const { id: key, value } = evt.target;

        // reset form field validation
        resetFormValidation(key);

        // update form field value
        setCustomerForm((state) => ({ ...state, [key]: value }));
    };
    const handleBlur = (evt) => {
        const { id: key, value } = evt.target;

        setFormValidation((state) => ({ ...state, [key]: validateField(value) }));
    };

    // update the customerDetails state in App.js when the customerForm changed
    const { setCustomerDetails } = props;
    useEffect(() => {
        setCustomerDetails(Object.assign({}, customerForm));
    }, [customerForm, setCustomerDetails]);

    // exposing the component method of validateCustomerForm,
    // so that we can validate the form when placing order
    useImperativeHandle(ref, () => ({ validateCustomerForm }));

    return (
        <div id="customerDetails" className="col-md-12 order-md-1">
            <h2 className="mb-3">MY DETAILS</h2>

            <form className="needs-validation">
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
                            {deliveryTimeOpts.map((time) => {
                                return (
                                    <option value={time} key={time}>
                                        {time}
                                    </option>
                                );
                            })}
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

// TODO: better to use the server time as current time
function generateDeliveryTimeOpts(closingTime) {
    if (!closingTime) return [];

    const millisecondsOfSlot = 15 * 60 * 1000;

    const startDate = new Date();
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    startDate.setSeconds(0);
    if (startMinutes < 15) {
        startDate.setMinutes(15);
    }
    if (15 <= startMinutes && startMinutes < 30) {
        startDate.setMinutes(30);
    }
    if (30 <= startMinutes && startMinutes < 45) {
        startDate.setMinutes(45);
    }
    if (45 <= startMinutes && startMinutes <= 59) {
        startDate.setMinutes(0);
        startDate.setHours(startHours + 1);
    }

    const endDate = new Date();
    endDate.setHours(+closingTime.split(':')[0]);
    endDate.setMinutes(+closingTime.split(':')[1]);
    endDate.setSeconds(+closingTime.split(':')[2] || 0);

    if (endDate.getTime() <= startDate.getTime()) return [];

    const countOfInterval = Math.round(
        (endDate.getTime() - startDate.getTime()) / millisecondsOfSlot
    );

    const timeList = new Array(countOfInterval).fill(0);
    timeList.length && (timeList[0] = startDate.getTime());

    let tmpDate = startDate;
    for (let i = 1; i < countOfInterval; i++) {
        const time = tmpDate.getTime() + millisecondsOfSlot;
        timeList[i] = time;
        tmpDate = new Date(time);
    }

    return timeList.map((time) => {
        const date = new Date(time);

        let hours = date.getHours();
        let minutes = date.getMinutes();

        let symbol = hours <= 12 ? 'am' : 'pm';

        hours = hours <= 12 ? hours : hours - 12;
        minutes = minutes === 0 ? '00' : minutes;

        return `${hours}:${minutes}${symbol}`;
    });
}

function isWeekend() {
    return [6, 7].includes(new Date().getDay() + 1);
}

export default React.forwardRef(CustomerDetails);
