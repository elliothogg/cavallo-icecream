import React, { useState, useEffect } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
function PopularFlavoursChart(props)  {
	const [popularFlavours, setPopularFlavours] = useState();
	const [options, setOptions] = useState({
		title: {
			text: ""
		},
		animationEnabled: true,
		data: [
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [{label: "Cherry", y: 247}]
		}
		]
	});

	

	useEffect(() => {
	fetch('/api/popularFlavours')
	.then((res)=>{
		return res.json().then((response=>{
			setOptions({...options, data: mapPopularFlavoursToChart(response.data)})
		}))
	}).catch((error) => {
		console.error(error);
	});
	}, [])

	

	

	function mapPopularFlavoursToChart(arrayIn) {
		let array = [...arrayIn];
		array.sort(function(a,b) {
			let item1 = a.ProductID;
			let item2 = b.ProductID;
			return (item1 < item2) ? -1 : (item1 > item2) ? 1 : 0;
		});
		let data = [{type: "column", dataPoints: []}];
		array.map( (item) => {
			data[0].dataPoints.push({label: item.Flavour, y: item.totalPurchased});
		})
		return data;
	}


	useEffect( () => {
		
	}, []);
	

	
	
	
		
	return (
	<div id="pop-flavours-chart-container">
		<CanvasJSChart options = {options} data
			/* onRef={ref => this.chart = ref} */
		/>
		{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
	</div>
	);
}


export default PopularFlavoursChart;