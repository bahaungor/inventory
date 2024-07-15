// IMPORT HOOKS IF YOU NEED DATABASE INTERACTION
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// IMPORT COMPONENTS
import ThemeSwitch from '../darkTheme/switch';

// IMPORT EXTERNAL CSS
import './header.css';

export default function Header() {
  // CREATE STATES FOR DATA YOU WILL FETCH FROM SOCKET
  const [GALCConnection, setGALCConnection] = useState(false);
  const [PLCConnection, setPLCConnection] = useState(false);
  const [cameraCount, setCameraCount] = useState(0);
  const [encoder, setEncoder] = useState(0);
  const [assyNo, setAssyNo] = useState(0);
  const [bodyNo, setBodyNo] = useState(0);
  const [model, setModel] = useState('-');

  // YOU CAN USE STATE WHICH YOU ASSIGNED FETCHED DATA ABOVE
  return (
    <header>
      <div className="firstRow">
        <Link to="/" className="header">A.S.P.I.R.E.</Link>
        <img src="/favicon.ico" alt="logo" />
        <ThemeSwitch />
      </div>
      <div className="secondRow">
        <div className={`galc ${GALCConnection ? 'connected' : 'disconnected'}`}>
          {GALCConnection ? 'GALC Connected' : 'GALC Disconnected'}
        </div>
        <div className="innerRow">
          <div className="cameras">Assy No:</div>
          <input className="inputArea" name="processAssyNo" type="number" value={assyNo} />
        </div>
        <div className="innerRow">
          <div className="cameras">Body No:</div>
          <div className="inputArea">{bodyNo}</div>
        </div>
        <div className="innerRow">
          <div className="cameras">Model:</div>
          <div className="inputArea">{model}</div>
        </div>
        <div className="innerRow">
          <div className="cameras">Encoder:</div>
          <div className="inputArea">{encoder}</div>
        </div>
        <div className="cameras">{`${cameraCount} Cameras Connected`}</div>
        <div className={`galc ${PLCConnection ? 'connected' : 'disconnected'}`}>
          {PLCConnection ? 'PLC Connected' : 'PLC Disconnected'}
        </div>
      </div>
    </header>
  );
}
