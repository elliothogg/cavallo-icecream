import React, { useState } from 'react';
import './BasketSummary.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
        timeout: 6000
    }
});

function BasketSummary(props) {
    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const history = useHistory();
    const currentRoute = useLocation();

    const changeButtons = () => {
        if (currentRoute.pathname === '/') {
            return (
                <button id="Checkout-button" onClick={handleCheckout}>
                    Checkout
                </button>
            );
        } else if (currentRoute.pathname === '/checkout') {
            return (
                <div id="basketbuttons-checkoutpage">
                    <Link to="/">
                        <button id="Back-2-menu-button">Back to menu</button>
                    </Link>

                    <button id="place-order-button" onClick={handleConfirmOrder}>
                        Place Order
                    </button>
                </div>
            );
        }
    };

    const hasProductsInCart = () => {
        return props.customerOrder.Items.length > 0;
    };
    const handleCheckout = () => {
        if (!hasProductsInCart()) {
            setShowModal(true);
            setModalMessage('Please add a product to your cart!');

            return;
        }

        history.push('/checkout');
    };

    const { customerDetails, paymentDetails } = props;
    const validateForm = () => {
        const isValidCustomerForm = props.validateCustomerForm(customerDetails);
        const isValidPaymentForm = props.validatePaymentForm(paymentDetails);

        return isValidCustomerForm && isValidPaymentForm;
    };

    // Handling `place order` here and navgiate to OrderConfirmation while the request is successfull.
    // Send the response data (orderID, orderTime) as route query params. And send route.location to OrderConfirmation as props in App.js.
    // Then we can access orderID and orderTime by props.location.state in OrderResult component.
    // The confirmOrder is not used again in App.js. Maybe remove it later?
    const handleConfirmOrder = () => {
        if (!validateForm()) return;

        setShowLoading(true);

        const params = [
            {
                storeID: props.companyInfo.ID || '',
                customerOrder: props.customerOrder,
                customerDetails: props.customerDetails
            }
        ];

        http.post('/api/orderConfirm', params)
            .then((res) => {
                setShowLoading(false);

                const data = res.data;
                const { orderID, orderTime, Status, reason } = data;

                if (Status === false) {
                    setShowModal(true);
                    setModalMessage(`Pay failed. ${reason}`);
                } else {
                    history.push('/order-confirmation', {
                        orderID,
                        orderTime
                    });
                }
            })
            .catch((err) => {
                console.error('confirm order failed: ', err);

                setShowLoading(false);
                setShowModal(true)
                setModalMessage('Placing order failed. Some errors happened. Please try it again!');
            });
    };

    const deleteItem = (itemId) => {
        props.removeCustomerOrderItem(itemId);
    };

    const addOneToItemCount = (itemId) => {
        props.incrementItemCountUp(itemId);
    };

    const subtractOneFromItemCount = (itemId) => {
        props.incrementItemCountDown(itemId);
    };

    const handleModalClose = () => {
        setShowModal(false)
    };
    const failedModal = (
        <div className="failed-modal">
            <div className="dialog">
                <div className="content">
                    <div className="title">HINT</div>
                    <div className="body">
                        <p>{modalMessage}</p>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
    const loading = (
        <div className="loading">
            <div className="content">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );

    return (
        <div id="BasketSummary-container">
            {showLoading && loading}
            {showModal && failedModal}

            <div id="order-items-container" className="container-fluid">
                <hr className="col-12" />
                <div className="col-12">
                    <div className="row">
                        <div className="col-3" id="flav">
                            FLAVOUR
                        </div>
                        <div className="col-3" id="quan">
                            QUANTITY
                        </div>
                        <div className="col-2" id="size">
                            SIZE
                        </div>
                        <div className="col-1" id="price">
                            PRICE
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>

                {props.customerOrder.Items.map((order, index) => {
                    return (
                        <div key={index} className="col-12">
                            <div className="row">
                                <div className="col-3" id="order-flav">
                                    {order.Flavour}
                                </div>
                                <div className="col-3" id="order-quan">
                                    <button
                                        id="Minus-in-basket"
                                        onClick={() => subtractOneFromItemCount(order.ItemID)}
                                    >
                                        -
                                    </button>
                                    {order.Quantity}
                                    <button
                                        id="Plus-in-basket"
                                        onClick={() => addOneToItemCount(order.ItemID)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="col-2" id="order-size">
                                    {order.Size}
                                </div>
                                <div className="col-2" id="order-price">
                                    £{order.TotalCost * order.Quantity}
                                </div>
                                <div className="col-1">
                                    <button
                                        id="Cancel-in-basket"
                                        onClick={() => deleteItem(order.ItemID)}
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <hr className="col-10" />
            <p id="total-price">Total Price: £{props.customerOrder.TotalCost}</p>
            {changeButtons()}
        </div>
    );
}

export default BasketSummary;
