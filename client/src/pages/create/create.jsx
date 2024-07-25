import { useEffect, useState } from 'react';

// useNavigate → TO NAVIGATE ANOTHER PAGE | useOutletContext → ACCESS
import { useNavigate, useOutletContext } from 'react-router-dom';

// IMPORT EXTERNAL CSS
import './create.css';

// IMPORT ENV VARIABLES
const API_URL = import.meta.env.VITE_NODE_SERVER || '';

export default function Create() {
  // CREATE NAVIGATOR
  const navigate = useNavigate();

  // IMPORT OUTLET CONTEXT
  const [selected, setSelected] = useOutletContext();

  // CREATE STATE FOR DATA TO FETCH FROM DB
  const [categories, setCategories] = useState([]);

  // CREATE STATE FOR FORM DATA & VALIDATION ERRORS
  const [validationErrors, setValidationErrors] = useState([]);
  const [formField, setformField] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
    price: '',
    stock: '',
  });

  // FETCH OPERATIONS AFTER COMPONENT MOUNTS MUST BE INSIDE useEffect
  useEffect(() => {
    (async () => {
      try {
        const blob = await fetch(`${API_URL}/inventory/Category`);
        const json = await blob.json();
        setCategories(json.result);
      }
      catch (error) {
        console.error('Error fetching categories:', error);
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
      formData.append('price', formField.price);
      formData.append('stock', formField.stock);
      formData.append('image', formField.image);
      formData.append('category', formField.category);

      const response = await fetch(`${API_URL}/create/${selected}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setformField({ name: '', description: '', image: '', category: '', price: '', stock: '' });
        document.querySelectorAll('input[type="file"]').forEach(box => box.value = null);
        navigate('/');
      }
      else {
        const errors = await response.json();
        setValidationErrors(errors.errors.filter(error => error.value !== ''));
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
      <h1>{`Create New  ${selected}`}</h1>
      <div><input required type="text" name="name" placeholder="Name" value={formField.name} onChange={handleChange} /></div>
      <div><textarea required type="text" name="description" placeholder="Description" value={formField.description} onChange={handleChange} /></div>
      {selected === 'Item' && (
        <>
          <div><input type="number" name="price" placeholder="Price" value={formField.price} required onChange={handleChange} /></div>
          <div><input type="number" name="stock" placeholder="Stock" value={formField.stock} required onChange={handleChange} /></div>
          <div>
            <select required name="category" value={formField.category} onChange={handleChange}>
              <option disabled value=""> -- Select a category -- </option>
              {categories.length > 0 && categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </>
      )}
      <input required type="file" name="image" onChange={handleChange} />
      {validationErrors.length > 0 && (
        <ul className="formErrors">
          {validationErrors.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      )}
      <div className="buttonContainer">
        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  );
}
