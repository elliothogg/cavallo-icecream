import React, { useState } from 'react';
import './Payment.css';

function Payment(props) {
    const [paymentForm, setPaymentForm] = useState({
        paymentMethod: 'credit',
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: ''
    });

    // true: valid; false: invalid
    const [formValidation, setFormValidation] = useState(() => {
        const initialValidation = {};
        Object.keys(paymentForm).forEach((key) => {
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

        setPaymentForm((state) => ({ ...state, [key]: value }));
    };
    const handleBlur = (evt) => {
        const { id: key, value } = evt.target;

        setFormValidation((state) => ({ ...state, [key]: validateForm(value) }));
    };

    return (
        <div id="payment" className="col-md-12 order-md-1">
            <h2 className="mb-3">Payment</h2>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="paymentMethod">Payment Method&nbsp;</label>
                    <select
                        className="custom-select d-block w-100"
                        id="paymentMethod"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        style={formValidation.paymentMethod ? {} : invalidInputStyle}
                    >
                        <option value="credit">Credit card</option>
                        <option value="debit">Debit card</option>
                    </select>
                    <div
                        className="invalid-feedback"
                        style={formValidation.paymentMethod ? {} : { display: 'block' }}
                    >
                        The payment method is required
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="cardName">Name on card&nbsp;</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardName"
                        value={paymentForm.cardName}
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        style={formValidation.cardName ? {} : invalidInputStyle}
                    />
                    <div
                        className="invalid-feedback"
                        style={formValidation.cardName ? {} : { display: 'block' }}
                    >
                        The name on card is required
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="cardNumber">Card number&nbsp;</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        value={paymentForm.cardNumber}
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        style={formValidation.cardNumber ? {} : invalidInputStyle}
                    />
                    <div
                        className="invalid-feedback"
                        style={formValidation.cardNumber ? {} : { display: 'block' }}
                    >
                        The credit card number is required
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="expirationDate">Expiration Date&nbsp;</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expirationDate"
                        value={paymentForm.expirationDate}
                        placeholder="MM / YY"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        style={formValidation.expirationDate ? {} : invalidInputStyle}
                    />
                    <div
                        className="invalid-feedback"
                        style={formValidation.expirationDate ? {} : { display: 'block' }}
                    >
                        The expiration date is required
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="securityCode">Security code&nbsp;</label>
                            <input
                                type="text"
                                className="form-control"
                                id="securityCode"
                                value={paymentForm.securityCode}
                                placeholder=""
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={true}
                                style={formValidation.securityCode ? {} : invalidInputStyle}
                            />
                            <div
                                className="invalid-feedback"
                                style={formValidation.securityCode ? {} : { display: 'block' }}
                            >
                                The security code is required
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row" style={{ fontSize: '14px', color: '#666666' }}>
                        <div className="col-md-3">
                            Your security code is the last three digits from the signature strip on
                            the back of your card or the four digits on the front of your card if
                            you are using American Express.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
