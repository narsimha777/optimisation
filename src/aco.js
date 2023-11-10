import React, { useState } from "react";
import "./App.css";
import util from "./components/utilities";

function Aco(props) {
  const [source, setSource] = useState();
  const [route, setRoute] = useState();
  const [nofant, setNofant] = useState();
  const [nofit, setNoit] = useState();
  const [alpha, setAlpha] = useState();
  const [beta, setBeta] = useState();
  const [evaprate, setEvap] = useState();
  let dist = props.dist;
  function handleclick(e) {
    e.preventDefault();
    let r = util.getfinalroute(
      parseInt(source),
      dist,
      parseInt(nofant),
      parseInt(nofit),
      parseFloat(alpha),
      parseFloat(beta),
      parseFloat(evaprate)
    );    
    setRoute(r);
  }
  return (
    <div>
      <form onSubmit={handleclick}>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-number" id="inputGroup-sizing-sm">Source:</span>
          <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setSource(e.target.value)} required />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-number" id="inputGroup-sizing-sm">No of Ants:</span>
          <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setNofant(e.target.value)} required />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-number" id="inputGroup-sizing-sm">No of iterations: </span>
          <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setNoit(e.target.value)} required/>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-number" id="inputGroup-sizing-sm">ALPHA</span>
          <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setAlpha(e.target.value)} required/>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-number" id="inputGroup-sizing-sm">BETA</span>
          <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setBeta(e.target.value)} required/>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-number" id="inputGroup-sizing-sm">Evaporation Rate:</span>
          <input type="number" step="0.1" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setEvap(e.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-success">SUBMIT</button>
      </form>
      {route&&(<h2>HIGHEST PHEROMONE LEVEL ROUTE FROM {source} IS {route.join(',')}</h2>)}
    </div>
  );
}

export default Aco;
