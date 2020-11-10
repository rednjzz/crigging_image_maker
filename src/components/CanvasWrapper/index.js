import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Canvas from '../Canvas';
import { baseURL } from '../config';

function CanvasWrapper() {
  const [craneInfo, setCraneInfo] = useState(null);

  useEffect( () => {
    axios.get('/parts',{
      method: 'get',
      baseURL: baseURL,
    }).then(result => {
      setCraneInfo(result.data);
    }).catch(e => console.log(e));
  }, [])

  return (
    <>
      {craneInfo ?  <Canvas craneInfo={craneInfo} /> : null}
    </>
  )
}

export default CanvasWrapper;