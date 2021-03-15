import React, {useState} from 'react';
import OrdersTable from './OrdersTable';
import EachOrdersProductsTable from './EachOrdersProductsTable';
import OrdersDateFilter from './OrdersDateFilter';
var sd = require('silly-datetime');

function Orders(props) {
    const [SelectedOrderID, setSelectedOrderID] = useState();
    const [SelectedOrderIDProducts, setSelectedOrderIDProducts] = useState();
    const [ordersToShow, setOrdersToShow] = useState('All');
    const [todaysDate, setTodaysDate] = useState(props.currentTime.slice(0,8));
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startOfWeekDate, setStartOfWeekDate] = useState(sd.format(startOfWeek(new Date()) , 'DD/MM/YYYY'));
    const [endOfWeekDate, setEndOfWeekDate] = useState(sd.format(endOfWeek(new Date()) , 'DD/MM/YYYY'));

    function endOfWeek(date) {
        if (new Date().getDay() == 0) return new Date();
        let lastday = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastday));
    }

    function startOfWeek(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }


    

    function handleChange(orderID) {
        setSelectedOrderID(orderID);
        fetch(`/api/responseEachOrdersProductsData?orderID=${orderID}`)
        .then((res)=>{
            return res.json().then((response=>{
            setSelectedOrderIDProducts(response.data);
        }))
        }).catch((error) => {
            console.error(error);
        });
    }

    function changeOrdersToShow(time) {
        setOrdersToShow(time);
    }

    function resetStartAndEndDates() {
        setStartDate();
        setEndDate();
    }

    function setStartFilterDate(date) {
        setStartDate(date)
    }

    function setEndFilterDate(date) {
        setEndDate(date)
    }

    const pageChanger = () => {
        if (SelectedOrderID)
            return <EachOrdersProductsTable onChange={handleChange} orderID={SelectedOrderID} eachOrdersProducts={SelectedOrderIDProducts}/>
        else return <div id="orders-table-and-date-container"><OrdersDateFilter onChange={changeOrdersToShow} resetStartAndEndDates={resetStartAndEndDates} setStartFilterDate={setStartFilterDate} setEndFilterDate={setEndFilterDate} startDateFilter={startDate} endDateFilter={endDate}/>
        <OrdersTable ordersToShow={ordersToShow} orders={props.orders} onChange={handleChange} todaysDate={todaysDate} startDate={startDate} endDate={endDate} startOfWeekDate={startOfWeekDate} endOfWeekDate={endOfWeekDate}/></div>
    }

  return (
    <div id='orders-container'>
        {pageChanger()}
    </div>
  );
}

export default Orders;
