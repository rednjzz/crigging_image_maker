import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Canvas from '../Canvas';

function CanvasWrapper() {
  const [craneInfo, setCraneInfo] = useState({});
  const [craneData, setCraneData] = useState({});
  const [partsData, setPartsData] = useState({});
  const [partsList, setPartsList] = useState([]);

  useEffect( () => {
    axios.get('/parts',{
      method: 'get',
      baseURL: 'http://localhost:3001/'
    }).then(result => {
      setCraneInfo(result.data);
      // setCraneData(result.data.craneData);
      // setPartsData(result.data.partsData);
      // setPartsList(result.data.partsList);
    }).catch(e => console.log(e));
  }, [])

  return (
    <>
      {/*{console.log("aa",craneInfo)}*/}
      <Canvas craneInfo={craneInfo} />
    </>
  )
}

export default CanvasWrapper;