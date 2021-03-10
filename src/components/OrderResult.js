import React from 'react';
import './OrderResult.css';

//Now App.js state is in this component, you can access it by doing {this.props.customerOrder.item1} or {this.props.customerDetails.name} as seen in App.js state.
//You can use these props to populate your forms with real order and customer data.

// providing defaultProps to view the page.
// maybe remove it later.
const defaultProps = {
    customerOrder: {
        orderId: '205-1752345-4325359',
        orderTime: '17 July 2020',
        TotalCost: 0.0,
        Items: [
            {
                flavor: 'banana',
                size: 'Large',
                cost: '￡3.22',
                count: 2
            },
            {
                flavor: 'orange',
                size: 'Small',
                cost: '￡1.25',
                count: 3
            }
        ]
    },
    customerDetails: {
        deliveryAddress: 'John 115D LONDON 1 BLANDFORD SQUARE XXXXX xxxx United Kingdom',
        billingAddress: 'John 115D LONDON 1 BLANDFORD SQUARE XXXXX xxxx United Kingdom'
    }
};

function OrderResult(props) {
    const { customerOrder, customerDetails } = props;

    const { orderID: orderId, orderTime, TotalCost: totalCost, Items: orderItems } = customerOrder;
    const { deliveryAddress, billingAddress } = customerDetails;

    console.log(orderItems);
    // compute total cost
    // const totalCost = Items.reduce((total, item) => {
    //     total += item.count * +item.cost.replace(/[^\d|.]/g, '');

    //     return +total.toFixed(2);
    // }, 0);

    return (
        <div id="orderResult" className="container-fluid">
            <h2 className="mb-3 col-12">Order Details</h2>
            <div className="col-12">
                Ordered on {orderTime} | Order # {orderId}
            </div>

            <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

            <div className="col-12">
                <div className="col-12" style={{ color: '#dddddd' }}>
                    <div className="row">
                        <div className="col-4">ITEM</div>
                        <div className="col-4">QTY</div>
                        <div className="col-4">COST</div>
                    </div>
                </div>

                {orderItems.map((item, index) => {
                    return (
                        <div className="col-12" key={index}>
                            <div className="row" style={{ color: '#333333' }}>
                                <div className="col-4">
                                    {item.Flavour}&nbsp;  {item.Size}
                                </div>
                                <div className="col-4">{item.Quantity}</div>
                                <div className="col-4">£{item.TotalCost * item.Quantity}</div>
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
                        {/* TODO: compute subtotal cost */}
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
                                    {/* TODO: remove fake data */}
                                    John 115D LONDON 1 BLANDFORD SQUARE XXXXX xxxx United Kingdom
                                    {billingAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4" style={{ paddingLeft: '0.6rem' }}>
                        <h4>DELIVERY ADDRESS</h4>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6" style={{ paddingLeft: 0 }}>
                                    {/* TODO: remove fake data */}
                                    John 115D LONDON 1 BLANDFORD SQUARE XXXXX xxxx United Kingdom
                                    {deliveryAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

OrderResult.defaultProps = defaultProps;

export default OrderResult;
