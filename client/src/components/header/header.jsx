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
      <ThemeSwitch />
      <div className="logo">
        <Link to="/" className="header">Inventory App</Link>
        <img src="./favicon.ico" alt="logo" />
      </div>
    </header>
  );
}
