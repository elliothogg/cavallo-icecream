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
    }


    if (startDate!=null)
        console.log( ('0' + startDate.getDate()).slice(-2) + '/' + ('0' + (startDate.getMonth()+1)).slice(-2) + '/' + startDate.getFullYear() );

    if (endDate!= null)
        console.log( ('0' + endDate.getDate()).slice(-2) + '/' + ('0' + (endDate.getMonth()+1)).slice(-2) + '/' + endDate.getFullYear() );
    
    return (
    <div id="order-date-filter-container">



    <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
    <h3 className="mb-4 col-12">ORDERS</h3>
    <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
    
    <div className="container-15" id="filter-buttons" style={{ color: '#dddddd' }}>
        <div className="row">
            <div className="col-1"><button>ALL</button></div>
            <div className="col-1"><button>TODAY</button></div>
            <div className="col-1"><button>THIS WEEK</button></div>
            <div className="col-2"><button>THIS MONTH</button></div>
            <div className="col-1"><button>CUSTOM:</button></div>
            <div className="col-0"><label>START DATE:</label></div>
            <div className="col-1"><DatePicker 
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Click to select a date"
                                    /></div>
            <div className="col-0"><label>END DATE:</label></div>
            <div className="col-2"><DatePicker 
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText="Click to select a date"
                                    /></div>
            <div className="col-sm"><button onClick={clearDates}>CLEAR</button></div>                        
        </div>
    </div>



    </div>
    );
      
}

export default OrdersDateFilter;
