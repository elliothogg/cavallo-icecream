import React, {useState, useEffect} from 'react';

function PopularFlavoursTable(props) {
  const [popularFlavours, setPopularFlavours] = useState();

  useEffect(() => {
  fetch('/api/popularFlavours')
  .then((res)=>{
    return res.json().then((response=>{
      setPopularFlavours(response.data);
    }))
  }).catch((error) => {
    console.error(error);
  });
  }, [])


  function awaitData() {
    if (popularFlavours === undefined) return;

    return <div id="popularflavours-table-container" className="container-fluid">

    <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
    <h3 className="mb-4 col-12">POPULAR PRODUCTS</h3>

    <div className="col-12">
      <div className="col-12" style={{ color: '#dddddd' }}>
        <div className="row">
          <div className="col-4">PRODUCT ID</div>
          <div className="col-4">FLAVOUR</div>
          <div className="col-4">TOTAL NUMBER SOLD</div>
        </div>
      </div>

    {popularFlavours.map((item, index) => {
      return (
        <div className="col-12" key={index}>
          <div className="row" style={{ color: '#333333' }}>
            <div className="col-4">{item.ProductID}</div>
            <div className="col-4">{item.Flavour}</div>
            <div className="col-4">{item.totalPurchased}</div>
          </div>
        </div>
      );
    })}
    </div>


  </div>
  }
    
  return (
      <>{awaitData()}</>
  );
}

export default PopularFlavoursTable;
