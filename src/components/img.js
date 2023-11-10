import React, { useState } from 'react';
import image from '../images/Indiamap.png';
import Aco from '../aco';
import '../App.css';

function ImageDistanceCalculator() {
  const [data, setData] = useState([]);
  const [point1, setPoint1] = useState(null);
  const [point2, setPoint2] = useState(null);
  const [distance, setDistance] = useState();

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setData((prev) => [...prev, { x, y }]);
  };

  const reset = () => {
    setData([]);
    setPoint1(null);
    setPoint2(null);
  };

  const calculateDistance = (a, b) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  };

  const dislist = () => {
    let len = data.length;
    let newarr = new Array(len).fill().map(() => new Array().fill(null));
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        let dist = calculateDistance(data[i], data[j]);
        newarr[i].push(dist);
      }
    }
    setDistance(newarr);
  }

  return (
    <div>
      <img
        src={image}
        alt="Your Image"
        onClick={handleImageClick}
        style={{ cursor: 'crosshair' }}
      />
      <div className='pointscontainer'>
        {data.map((ele, ind) => (
          <div className="points" key={ind}>Point {ind + 1}: ({ele.x}, {ele.y})</div>
        ))}
      </div>
      <button className='btn btn-outline-warning btn-lg' onClick={reset}>Reset</button>
      <form className="frm">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-lg">Enter Source Point index:</span>
          <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" type="number"
            onChange={(e) => {
              const index = parseInt(e.target.value, 10) - 1;
              if (data[index]) {
                setPoint1(data[index]);
              }
            }} />
          <span className="input-group-text" id="inputGroup-sizing-default">Enter Target Point index:</span>
          <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" type="number"
          onChange={(e) => {
            const index = parseInt(e.target.value, 10) - 1;
            if (data[index]) {
              setPoint2(data[index]);
            }
          }}/>
        </div>
      </form>
      {point1 && <h2>Source: x: {point1.x}, y: {point1.y}</h2>}
      {point2 && <h2>Target: x: {point2.x}, y: {point2.y}</h2>}
      <button className='btn btn-outline-danger' onClick={dislist}>GET DISTANCE</button>
      <div className='discontainer'>
        {distance && distance.map((ele, ind) => (<div className="dis" key={ind + 1}>Distances from Point{ind + 1} are {ele.map((t) => t).join(', ')}</div>))}
      </div>
      <Aco dist={distance}/>
    </div>
  );
}

export default ImageDistanceCalculator;

