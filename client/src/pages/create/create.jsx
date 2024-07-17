import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import './create.css';

// IMPORT ENV VARIABLES
const API_URL = import.meta.env.VITE_NODE_SERVER || '';

export default function Create() {
  const [selected, setSelected] = useOutletContext();

  // CREATE STATE FOR EACH FORM DATA
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form action="" method="post" onSubmit={handleSubmit} className="formContainer">
      <h1>
        Create New
        {' '}
        {selected}
      </h1>
      <div><input type="text" name="name" /></div>
      <div><input type="text" name="description" /></div>
      {selected === 'Item' && <div><select multiple name="category"></select></div>}
      <button type="submit">Add</button>
    </form>
  );
}
