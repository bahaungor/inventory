import { useEffect, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

// IMPORT EXTERNAL CSS
import './homepage.css';

export default function Homepage() {
  const navigate = useNavigate();

  const [selected, setSelected] = useOutletContext();
  const [items, setItems] = useState([]);

  function handleClick() {
    navigate('/create');
  }

  return (
    <div className="welcomeText">
      { selected === null
      && (
        <div>
          <h1>Welcome to Your Simple Inventory App!</h1>
          <p>This app allows you to easily track your belongings by category and item.</p>

          <h2>Getting Started</h2>

          <ul>
            <li>Create new categories to organize your items (e.g., Electronics, Clothing, Tools).</li>
            <li>Add items to each category (e.g., Laptop, Shirt, Hammer).</li>
            <li>View and manage your inventory at a glance.</li>
            <br />
            <div>
              <b>NOT: </b>
              You can't edit default categories and items.
            </div>
          </ul>
        </div>
      )}
      {selected !== null && (
        <div className="container">
          <h1>
            {selected}
            {' '}
            List
          </h1>
          <button type="button" onClick={handleClick}>
            Create
            {' '}
            {selected}
          </button>
          <div className="itemContainer">
            {items.length
              ? items.map(item => <div key={item._id}>item.name</div>)
              : (
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                )}
          </div>
        </div>
      )}
    </div>
  );
}
