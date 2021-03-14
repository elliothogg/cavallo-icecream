import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./OrdersDateFilter.css";

function OrdersDateFilter(props) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    function clearDates() {
        setStartDate();
        setEndDate();
        props.resetStartAndEndDates();
    }

    return (
    <div id="order-date-filter-container">

    <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
    <h3 className="mb-4 col-12">ORDERS</h3>
    <hr className="col-10" style={{ marginLeft: '0.5rem' }} />

    <div className="container-15" id="filter-buttons" style={{ color: '#dddddd' }}>
        <div className="row">
            <div className="col-1"><button className="filter-text" onClick={ () => props.onChange('All') }>ALL</button></div>
            <div className="col-1"><button className="filter-text" onClick={ () => props.onChange('Today') }>TODAY</button></div>
            <div className="col-1"><button className="filter-text" onClick={ () => props.onChange('This Week') }>THIS WEEK</button></div>
            <div className="col-1"><button className="filter-text" onClick={ () => props.onChange('This Month') }>THIS MONTH</button></div>
            <div className="col-1"><button className="filter-text" onClick={ () => props.onChange('Custom Range') }>CUSTOM:</button></div>
            <div className="col-0"><label>START DATE:</label></div>
            <div className="col-1"><DatePicker
                                    selected={startDate}
                                    onChange={date => {
                                        setStartDate(date);
                                        props.setStartFilterDate( ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear() );
                                    }}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Click to select a date"
                                    /></div>
            <div className="col-0" id="end-date"><label>END DATE:</label></div>
            <div className="col-2"><DatePicker
                                    selected={endDate}
                                    onChange={date => {
                                        setEndDate(date);
                                        props.setEndFilterDate( ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear() );
                                        }}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText="Click to select a date"
                                    /></div>
            <div className="col-sm"><button className="filter-text" onClick={clearDates}>CLEAR</button></div>
        </div>
    </div>



    </div>
    );

}

export default OrdersDateFilter;
