import { useEffect, useState } from 'react';

// Link & useNavigate → NAVIGATE | useOutletContext → ACCESS OUTLET CONTEXT | useParams → ACCESS URL PARAMs
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

// IMPORT EXTERNAL CSS
import './categoryDetail.css';

// IMPORT ENV VARIABLES
const API_URL = import.meta.env.VITE_NODE_SERVER || '';

export default function CategoryDetail() {
  // CREATE NAVIGATOR
  const navigate = useNavigate();

  // GET URL PARAMETER
  const { name } = useParams();

  // IMPORT OUTLET CONTEXT
  const [selected, setSelected] = useOutletContext();

  // CREATE STATES FOR DATA YOU WILL FETCH FROM DATABASE
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);

  // CREATE STATES FOR FORM DATA & EDIT MODE
  const [editMode, setEditMode] = useState(false);
  const [formField, setformField] = useState({
    name: '',
    description: '',
    image: '',
  });

  // FETCH OPERATIONS AFTER COMPONENT MOUNTS MUST BE INSIDE useEffect
  useEffect(() => {
    (async () => {
      try {
        const blob = await fetch(`${API_URL}/${selected}/${name}`);
        const json = await blob.json();
        setCategory(json.category);
        setItems(json.items);
        setformField({ ...formField, name: json.category.name, description: json.category.description });
      }
      catch (error) {
        console.error('Error fetching category and items:', error);
      }
    })();
  }, []); // RUN EFFECT ONCE ON MOUNT & IF VALUE INSIDE [] CHANGES

  async function handleDelete() {
    const decision = confirm('Are you sure you want to delete this category & all of its items?');
    if (!decision)
      return;
    if (items.length > 0) {
      alert('You cannot delete categories with items in it!');
      return;
    }

    try {
      await fetch(`${API_URL}/${selected}/${category._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageID: category.image.cloudinaryID, items }),
      });
      navigate('/');
    }
    catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // MUST STEP TO HANDLE MULTIPART FORM DATA (FORM DATA WITH FILE UPLOAD)
      const formData = new FormData();
      formData.append('id', category._id);
      formData.append('name', formField.name);
      formData.append('description', formField.description);
      formData.append('createdBy', category.createdBy);
      formData.append('image', formField.image);
      formData.append('imageID', category.image.cloudinaryID);

      const blob = await fetch(`${API_URL}/${selected}/${category._id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (blob.ok) {
        setformField({ name: '', description: '', image: '' });
        document.querySelectorAll('input[type="file"]').forEach(box => box.value = null);
        const json = await blob.json();
        setCategory(json.result);
        setformField({ ...formField, name: json.result.name, description: json.result.description });
        setEditMode(false);
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
    <>
      <div className="categorySummary">
        <div className="categoryImageContainer">
          {category.image && <img className="categoryImage" src={category.image.URL} alt="Category Image" />}
        </div>
        { editMode
          ? (
              <form action="" method="post" onSubmit={handleSubmit} className="formContainer">
                <h1>{category.name && `Modify ${category.name}`}</h1>
                <div><input type="text" name="name" placeholder="Name" value={formField.name} onChange={handleChange} /></div>
                <div><input type="text" name="description" placeholder="Description" value={formField.description} onChange={handleChange} /></div>
                <input type="file" name="image" onChange={handleChange} />
                <div className="buttonContainer">
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setEditMode(false) || setformField({ ...formField, name: category.name, description: category.description })}>Cancel</button>
                </div>
              </form>
            )
          : (
              <div className="summary">
                {category.name && <div className="title">{`Category: ${category.name}`}</div>}
                {category.description && <div className="description">{category.description}</div>}
                {category.createdBy === 'Admin' && (
                  <div className="description">
                    <b>NOT: </b>
                    Default categories cannot be changed or deleted.
                  </div>
                )}
                <div className="buttonContainer">
                  <button type="button" disabled={category.createdBy === 'Admin'} onClick={() => setEditMode(true)}>Edit</button>
                  <button type="button" disabled={category.createdBy === 'Admin'} onClick={handleDelete}>Delete</button>
                </div>
              </div>
            )}
      </div>
      <div className="items">
        <div className="itemContainer">
          { items && items.map(item => (
            <Link to={`/Item/${item.name}`} key={item._id} className="item" onClick={() => setSelected('Item')}>
              <div className="imgContainer"><img src={item.image.URL} alt={item.name} /></div>
              <div className="itemText">{item.name}</div>
            </Link>
          ),
          )}
        </div>
      </div>
    </>
  );
}
