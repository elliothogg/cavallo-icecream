import React from 'react';
import './OrderResult.css';

function OrderResult(props) {
    const { orderID, orderTime } = props.location.state;
    const { TotalCost: totalCost, Items: orderItems } = props.customerOrder;
    const { deliveryAddress, deliveryPostcode, billingAddress, billingPostcode } = props.customerDetails;

    return (
        <div id="orderResult" className="container-fluid">
            <div id="blank"></div>
            <div id="resultContent">
                <h2 className="mb-3 col-12">Order Details</h2>
                <div className="col-12">
                    Ordered on {orderTime} | Order # {orderID}
                </div>

                <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

                <div className="col-12">
                    <div className="col-12 mb-2" style={{ color: '#dddddd' }}>
                        <div className="row">
                            <div className="col-4">ITEM</div>
                            <div className="col-4">QTY</div>
                            <div className="col-4">COST</div>
                        </div>
                    </div>

                    {orderItems.map((item, index) => {
                        return (
                            <div className="col-12 mb-2" key={index}>
                                <div className="row" style={{ color: '#333333' }}>
                                    <div className="col-4">
                                        <div>{item.Flavour}&nbsp;</div>
                                        <div>{item.Size}</div>
                                    </div>
                                    <div className="col-4">{item.Quantity}</div>
                                    <div className="col-4">
                                        £{(item.TotalCost * item.Quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

                <div className="col-12">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">Subtotal:</div>
                            <div className="col-4">£{totalCost}</div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">Total:</div>
                            <div className="col-4">£{totalCost}</div>
                        </div>
                    </div>
                </div>

                <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

                <div className="col-12">
                    <div className="row justify-content-between">
                        <div className="col-4">
                            <h4>BILLING ADDRESS</h4>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6" style={{ paddingLeft: 0 }}>
                                        {billingAddress}
                                    </div>
                                    <div className="col-6" style={{ paddingLeft: 0 }}>
                                        {billingPostcode}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4"></div>
                        {deliveryAddress && (
                            <div className="col-4" style={{ paddingLeft: '0.6rem' }}>
                                <h4>DELIVERY ADDRESS</h4>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6" style={{ paddingLeft: 0 }}>
                                            {deliveryAddress}
                                        </div>
                                        <div className="col-6" style={{ paddingLeft: 0 }}>
                                            {deliveryPostcode}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderResult;
