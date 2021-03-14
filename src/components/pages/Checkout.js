import React from 'react';
import './Checkout.css';
import CustomerDetails from '../CustomerDetails';
import Payment from '../Payment';
import BasketSummary from '../BasketSummary';

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.customerDetailsRef = React.createRef();
        this.paymentDetailsRef = React.createRef();
        this.state = {
            validateCustomerForm: '',
            validatePaymentForm: ''
        };
    }

    componentDidMount() {
        this.setState({
            validateCustomerForm: this.customerDetailsRef.current.validateCustomerForm,
            validatePaymentForm: this.paymentDetailsRef.current.validatePaymentForm
        });
    }

    render() {
        return (
            <div id="Checkout-container" className="row">
                <div className="col-6">
                    <CustomerDetails ref={this.customerDetailsRef} {...this.props} />
                    <Payment ref={this.paymentDetailsRef} />
                </div>

                {Object.values(this.state).every((val) => val) && (
                    <div className="col-67">
                        <BasketSummary {...this.props} {...this.state} />
                    </div>
                )}
            </div>
        );
    }
}

export default Checkout;
