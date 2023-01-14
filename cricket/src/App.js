import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [runStatus,setRunStatus] = useState('Start Innings');
  // const [run, setRun] = useState();
  let run = useRef(-1);
  const [btnStatus, setBtnStatus] = useState(true);
  const [selectFiled, setSelectFiled] = useState(false);
  const [oversShow, setOversShow] = useState("");
  const [scoreShow, setScoreShow] = useState("");
  const [totalOvers, setTotalOvers] = useState(0);
  let oversFiled = useRef();
  let runsArr = useRef([0, 1, 2, 4, 6]);
  let score = useRef(0);
  let wicket = useRef(0);
  let balls = useRef(0);
  let over = useRef(0);

  useEffect(()=>{
    setScoreShow(scoreBoard())
    setOversShow(showOvers());
    selectOvers()
  },[])
  const selectOvers = ()=>{
    if(oversFiled.current.value === '...'){
      setBtnStatus(true);
    }
    else{
      setBtnStatus(false);
      setTotalOvers(oversFiled.current.value*1)
    }
  }
  const doBat = () => { 
    setSelectFiled(true)
    let index = parseInt(Math.random() * 5);
    run.current=runsArr.current[index]
    setScoreShow(scoreBoard())
    balls.current++;
    setOversShow(showOvers());
    if (wicket.current === 10 || over.current === totalOvers) {
      setBtnStatus(true);
      setRunStatus("Innings Over");
      return `${score.current} | ${wicket.current}`;
    }
  };
  const scoreBoard = () => {
    if (wicket.current === 10 || over.current === 5) {
      setBtnStatus(true);
      setRunStatus("Innings Over");
      return `${score.current} | ${wicket.current}`;
    } else {
      if (run.current === 1) {
        score.current += 1;
        setRunStatus("Single");
      } else if (run.current === 2) {
        score.current += 2;
        setRunStatus("Double");
      } else if (run.current === 4) {
        score.current += 4;
        setRunStatus("Four");
      } else if (run.current === 6) {
        score.current += 6;
        setRunStatus("Six");
      } else if (run.current === 0) {
        wicket.current += 1;
        setRunStatus("Out");
      }
      return `${score.current} | ${wicket.current}`;
    }

  };
  const showOvers = () => {
    if (balls.current === 6) {
      balls.current = 0;
      over.current++;
    }
    return `${over.current}.${balls.current}`;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <div className="form-group">
              <select disabled={selectFiled} className="form-control" ref={oversFiled} onChange={selectOvers}>
                <option value="...">Select Overs..</option>
                <option value="2">2 Overs</option>
                <option value="5">5 Overs</option>
                <option value="10">10 Overs</option>
                <option value="20">20 Overs</option>
                <option value="50">50 Overs</option>
              </select>
            </div>
        </div>
      </div>
      <div className="row mt-5 text-center">
      <h1>First Innings</h1>
        <div className="col-md-2 m-auto">
          <span>
            <h3>{runStatus}</h3>
          </span>
        </div>
        <div className="col-md-2 m-auto">
          <button
            onClick={doBat}
            disabled={btnStatus}
            type=""
            className="btn btn-success"
          >
            Bat
          </button>
        </div>
        <div className="col-md-2">
          <button
            onClick={()=>window.location.reload(true)}
            disabled={btnStatus}
            type=""
            className="btn btn-success"
          >
            Restart
          </button>
        </div>
        <div className="row m-auto mt-5">
          <div className="col-md-3 m-auto">
            <h3>{scoreShow}</h3>
            <h3><span>{oversShow} / </span><span>{totalOvers}</span></h3>
          </div>
        </div>
      </div>
    </div>
  );
}
