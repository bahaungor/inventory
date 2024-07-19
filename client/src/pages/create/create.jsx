import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import './create.css';

// IMPORT ENV VARIABLES
const API_URL = import.meta.env.VITE_NODE_SERVER || '';

export default function Create() {
  // CREATE NAVIGATOR
  const navigate = useNavigate();

  // IMPORT OUTLET CONTEXT
  const [selected, setSelected] = useOutletContext();

  // CREATE STATE FOR DATA TO FETCH FROM DB & FORM DATA
  const [categories, setCategories] = useState([]);
  const [formField, setformField] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
  });

  // FETCH OPERATIONS AFTER COMPONENT MOUNTS MUST BE INSIDE useEffect
  useEffect(() => {
    (async () => {
      try {
        const blob = await fetch(`${API_URL}/Categories`);
        const json = await blob.json();
        setCategories(json.result);
      }
      catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    })();
  }, []); // RUN EFFECT ONCE ON MOUNT & IF VALUE INSIDE [] CHANGES

  async function handleSubmit(e) {
    e.preventDefault();
    try {
    // MUST STEP TO HANDLE MULTIPART FORM DATA (FORM DATA WITH FILE UPLOAD)
      const formData = new FormData();
      formData.append('name', formField.name);
      formData.append('description', formField.description);
      formData.append('image', formField.image);
      formData.append('category', formField.category);

      const response = await fetch(`${API_URL}/create/${selected}`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData,
      });

      if (response.ok) {
        setformField({ name: '', description: '', category: '' });
        document.querySelectorAll('input[type="file"]').forEach(box => box.value = null);
        navigate('/');
      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    type === 'checkbox'
      ? setformField({ ...formField, [name]: checked })
      : type === 'file'
        ? setformField({ ...formField, [name]: e.target.files[0] })
        : type === 'select-multiple'
          ? setformField({ ...formField, [name]: Array.from(options).filter(opt => opt.selected).map(opt => opt.value) })
          : setformField({ ...formField, [name]: value });
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit} className="formContainer">
      <h1>
        Create New
        {' '}
        {selected}
      </h1>
      <div><input required type="text" name="name" placeholder="Name" value={formField.name} onChange={handleChange} /></div>
      <div><input required type="text" name="description" placeholder="Description" value={formField.description} onChange={handleChange} /></div>
      {selected === 'Item' && (
        <div>
          <select required name="category" value={formField.category} onChange={handleChange}>
            <option disabled value=""> -- Select a category -- </option>
            {categories.length > 0 && categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}
      <input required type="file" name="image" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}