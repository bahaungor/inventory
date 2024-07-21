import { useEffect, useState } from 'react';

// useNavigate → TO NAVIGATE ANOTHER PAGE | useOutletContext → ACCESS
import { useNavigate, useOutletContext } from 'react-router-dom';

// IMPORT EXTERNAL CSS
import './homepage.css';

// IMPORT ENV VARIABLES
const API_URL = import.meta.env.VITE_NODE_SERVER || '';

export default function Homepage() {
  // CREATE NAVIGATOR
  const navigate = useNavigate();

  const [selected, setSelected] = useOutletContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      if (selected) {
        try {
          const blob = await fetch(`${API_URL}/inventory/${selected}`);
          const json = await blob.json();
          setItems(json.result);
        }
        catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    })();
  }, [selected]); // RUN EFFECT ONCE ON MOUNT & IF VALUE INSIDE [] CHANGES

  function handleClick() {
    navigate('/create');
  }

  return (
    <div>
      { selected === null
      && (
        <div className="welcomeText">
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
          {items.length
            ? (
                <div className="itemContainer">
                  { items.map(item => (
                    <div key={item._id} className="item">
                      <div className="imgContainer">
                        <img src={item.imageURL} alt={item.name} />
                      </div>
                      <div className="itemText">
                        {item.name}
                        {item.category ? <br /> : null}
                        {item.category && `(${item.category.name})`}
                      </div>
                    </div>
                  ),
                  )}
                </div>
              )
            : (
                <div className="loading">
                  <div className="spinner"></div>
                </div>
              )}

        </div>
      )}
    </div>
  );
}
