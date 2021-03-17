import React, { useState, useEffect, useImperativeHandle } from 'react';
import './CustomerDetails.css';
import axios from 'axios';

function CustomerDetails(props, ref) {
    const [customerForm, setCustomerForm] = useState(Object.assign({}, props.customerDetails));
    const [timeList, setTimeList] = useState([]);

    const { isDelivery } = props.customerOrder;

    const [formFieldErrorMsg, setFormFieldErrorMsg] = useState(() => {
        const initialState = {
            customerFirstName: '',
            customerLastName: '',
            customerPhone: '',
            customerEmail: '',
            billingAddress: '',
            billingPostcode: '',
            deliveryAddress: '',
            deliveryPostcode: '',
            deliveryTime: '',
            collectionTime: ''
        };

        if (!isDelivery) {
            delete initialState.deliveryAddress;
            delete initialState.deliveryPostcode;
            delete initialState.deliveryTime;
        } else {
            delete initialState.collectionTime;
        }

        return initialState;
    });

    const formValidator = {
        customerFirstName: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The first name is required.';
            }

            return '';
        },
        customerLastName: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The last name is required.';
            }

            return '';
        },
        customerPhone: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The phone is required.';
            }

            return '';
        },
        customerEmail: (val) => {
            const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!val.replace(/\s/g, '')) {
                return 'The email is required.';
            } else if (!emailRegex.test(val)) {
                return 'The email is not a valid format.';
            }

            return '';
        },
        billingAddress: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The billing address is required.';
            }
        },
        billingPostcode: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The billing postcode is required.';
            }

            return '';
        },
        deliveryAddress: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The delivery address is required.';
            }

            return '';
        },
        deliveryPostcode: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The delivery postcode is required.';
            } else if (!val.startsWith('NE') && !val.startsWith('ne') && !val.startsWith('Ne') && !val.startsWith('nE')) {
                return 'The delivery postcode must start with NE.';
            }

            return '';
        },
        deliveryTime: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The delivery time is required.';
            }

            return '';
        },
        collectionTime: (val) => {
            if (!val.replace(/\s/g, '')) {
                return 'The collection time is required.';
            }

            return '';
        },
        driverInstructions: (val) => {
            if (!val.replace(/\s/g, '')) {
                return '';
            }
            
            return '';
        },
    };

    const validateCustomerForm = (formData) => {
        setFormFieldErrorMsg((state) => {
            Object.keys(state).forEach((key) => {
                const validator = formValidator[key];
                state[key] = validator(formData[key]);
            });

            return { ...state };
        });

        return Object.keys(formFieldErrorMsg).every((key) => {
            const validator = formValidator[key];

            return !validator(formData[key]);
        });
    };
    const resetFormValidation = (key) => {
        setFormFieldErrorMsg((state) => ({
            ...state,
            [key]: ''
        }));
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

        const validator = formValidator[key];

        validator &&
            setFormFieldErrorMsg((state) => ({
                ...state,
                [key]: validator(value)
            }));
    };

    // update the customerDetails state in App.js when the customerForm changed
    const { setCustomerDetails } = props;
    useEffect(() => {
        setCustomerDetails(Object.assign({}, customerForm));
    }, [customerForm, setCustomerDetails]);

    // get delivery or collection time options
    const { WeekdayClosingTime, WeekendClosingTime } = props.companyInfo;
    useEffect(() => {
        const getTimeList = async () => {
            const currentTime = await getCurrentTime();
            const timeList = await generateTimeList(
                isWeekend(currentTime) ? WeekendClosingTime : WeekdayClosingTime,
                currentTime
            );

            setTimeList(timeList);
        };

        getTimeList();
    }, [WeekdayClosingTime, WeekendClosingTime]);

    // exposing the component method of validateCustomerForm,
    // so that we can validate the form when placing order
    useImperativeHandle(ref, () => ({ validateCustomerForm }));

    return (
        <div id="customerDetails">
            <h2 className="mb-3">MY DETAILS</h2>

            <div style={{ marginBottom: '0.2rem', color: 'red' }}>
                *Fileds marked with an asterisk must be filled in to proceed
            </div>

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
                            style={formFieldErrorMsg.customerFirstName ? invalidInputStyle : {}}
                        />
                        <div
                            className="invalid-feedback"
                            style={formFieldErrorMsg.customerFirstName ? { display: 'block' } : {}}
                        >
                            {formFieldErrorMsg.customerFirstName}
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
                            style={formFieldErrorMsg.customerLastName ? invalidInputStyle : {}}
                        />
                        <div
                            className="invalid-feedback"
                            style={formFieldErrorMsg.customerLastName ? { display: 'block' } : {}}
                        >
                            {formFieldErrorMsg.customerLastName}
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
                            style={formFieldErrorMsg.customerPhone ? invalidInputStyle : {}}
                        />
                        <div
                            className="invalid-feedback"
                            style={formFieldErrorMsg.customerPhone ? { display: 'block' } : {}}
                        >
                            {formFieldErrorMsg.customerPhone}
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
                            style={formFieldErrorMsg.customerEmail ? invalidInputStyle : {}}
                        />
                        <div
                            className="invalid-feedback"
                            style={formFieldErrorMsg.customerEmail ? { display: 'block' } : {}}
                        >
                            {formFieldErrorMsg.customerEmail}
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
                            style={formFieldErrorMsg.billingAddress ? invalidInputStyle : {}}
                        />
                        <div
                            className="invalid-feedback"
                            style={formFieldErrorMsg.billingAddress ? { display: 'block' } : {}}
                        >
                            {formFieldErrorMsg.billingAddress}
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
                            style={formFieldErrorMsg.billingPostcode ? invalidInputStyle : {}}
                        />
                        <div
                            className="invalid-feedback"
                            style={formFieldErrorMsg.billingPostcode ? { display: 'block' } : {}}
                        >
                            {formFieldErrorMsg.billingPostcode}
                        </div>
                    </div>
                </div>

                {isDelivery ? (
                    <div>
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
                                    style={
                                        formFieldErrorMsg.deliveryAddress ? invalidInputStyle : {}
                                    }
                                />
                                <div
                                    className="invalid-feedback"
                                    style={
                                        formFieldErrorMsg.deliveryAddress
                                            ? { display: 'block' }
                                            : {}
                                    }
                                >
                                    {formFieldErrorMsg.deliveryAddress}
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
                                    disabled={true}
                                    style={
                                        formFieldErrorMsg.deliveryPostcode ? invalidInputStyle : {}
                                    }
                                />
                                <div
                                    className="invalid-feedback"
                                    style={
                                        formFieldErrorMsg.deliveryPostcode
                                            ? { display: 'block' }
                                            : {}
                                    }
                                >
                                    {formFieldErrorMsg.deliveryPostcode}
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
                                    style={formFieldErrorMsg.deliveryTime ? invalidInputStyle : {}}
                                >
                                    <option value="ASAP">ASAP</option>
                                    {timeList.map((time) => {
                                        return (
                                            <option value={time} key={time}>
                                                {time}
                                            </option>
                                        );
                                    })}
                                </select>
                                <div
                                    className="invalid-feedback"
                                    style={
                                        formFieldErrorMsg.deliveryTime ? { display: 'block' } : {}
                                    }
                                >
                                    {formFieldErrorMsg.deliveryTime}
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
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="collectionTime">Collection time&nbsp;</label>
                            <select
                                className="custom-select d-block w-100"
                                id="collectionTime"
                                onChange={handleChange}
                                required={true}
                                style={formFieldErrorMsg.collectionTime ? invalidInputStyle : {}}
                            >
                                <option value="ASAP">ASAP</option>
                                {timeList.map((time) => {
                                    return (
                                        <option value={time} key={time}>
                                            {time}
                                        </option>
                                    );
                                })}
                            </select>
                            <div
                                className="invalid-feedback"
                                style={formFieldErrorMsg.collectionTime ? { display: 'block' } : {}}
                            >
                                {formFieldErrorMsg.collectionTime}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
        timeout: 6000
    }
});

// get the current time here, so that we can always use the latest current time while checkouting.
function getCurrentTime() {
    return http
        .get('/api/currentTime')
        .then((res) => {
            const { curTime: currentTime } = res.data;

            const timeArr = currentTime.split(' ');
            const timeStr = `${timeArr[0].split('/').reverse().join('/')} ${timeArr[1]}`;

            return timeStr;
        })
        .catch((err) => {
            console.error('get current time failed: ', err);

            return new Date(); // fallback
        });
}

async function generateTimeList(closingTime, currentTime) {
    if (!closingTime) return [];

    const millisecondsOfSlot = 15 * 60 * 1000;
    const MIN_INTERVAL = 10;

    const startDate = new Date(currentTime);
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes() + MIN_INTERVAL;

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
    if (45 <= startMinutes) {
        startDate.setMinutes(0);
        startDate.setHours(startHours + 1);
    }

    const endDate = new Date(currentTime);
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

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes === 0 ? '00' : minutes;

        return `${hours}:${minutes}`;
    });
}

function isWeekend(time) {
    return [6, 7].includes(new Date(time).getDay() + 1);
}

export default React.forwardRef(CustomerDetails);
