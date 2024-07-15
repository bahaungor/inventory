import { Link } from 'react-router-dom';
import './sidebar.css';

// EXPOSE FUNCTION TO HANDLE EVENTS OUTSIDE COMPONENT FILE → <Menubtn toggleSidebar={toggleSidebar} />
export function Menubtn({ toggleSidebar }) {
  return <span className="menubtn" onClick={toggleSidebar}>☰</span>;
}

export function Sidebar() {
  return (
    <div className="sidebar">
      <div>Home</div>
      <div>Settings</div>
    </div>
  );
}
