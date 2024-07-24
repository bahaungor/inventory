import { useEffect, useState } from 'react';

// Link & useNavigate → NAVIGATE | useOutletContext → ACCESS OUTLET CONTEXT | useParams → ACCESS URL PARAMs
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

// IMPORT EXTERNAL CSS
import './categoryDetail.css';

// IMPORT ENV VARIABLES
const API_URL = import.meta.env.VITE_NODE_SERVER || '';

export default function ItemDetail() {
  // CREATE NAVIGATOR
  const navigate = useNavigate();

  // GET URL PARAMETER
  const { name } = useParams();

  // IMPORT OUTLET CONTEXT
  const [selected, setSelected] = useOutletContext();

  // CREATE STATES FOR DATA YOU WILL FETCH FROM DATABASE
  const [item, setItem] = useState([]);
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
        setItem(json.item);
        setformField({ ...formField, name: json.item.name, description: json.item.description });
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
    try {
      await fetch(`${API_URL}/${selected}/${item._id}/${item.image.cloudinaryID}`, { method: 'DELETE' });
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
      formData.append('id', item._id);
      formData.append('name', formField.name);
      formData.append('description', formField.description);
      formData.append('image', formField.image);
      formData.append('imageID', item.image.cloudinaryID);

      const blob = await fetch(`${API_URL}/${selected}/${item._id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (blob.ok) {
        setformField({ name: '', description: '', image: '' });
        document.querySelectorAll('input[type="file"]').forEach(box => box.value = null);
        const json = await blob.json();
        setItem(json.result);
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
          {item.image && <img className="categoryImage" src={item.image.URL} alt="Item Image" />}
        </div>
        { editMode
          ? (
              <form action="" method="post" onSubmit={handleSubmit} className="formContainer">
                <h1>{item.name && `Modify ${item.name}`}</h1>
                <div><input type="text" name="name" placeholder="Name" value={formField.name} onChange={handleChange} /></div>
                <div><input type="text" name="description" placeholder="Description" value={formField.description} onChange={handleChange} /></div>
                <input type="file" name="image" onChange={handleChange} />
                <div className="buttonContainer">
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setEditMode(false) || setformField({ ...formField, name: item.name, description: item.description })}>Cancel</button>
                </div>
              </form>
            )
          : (
              <div className="summary">
                {item.name && <div className="title">{`Item: ${item.name}`}</div>}
                {item.description && <div className="description">{item.description}</div>}
                {item.price && <div className="price">{`Price: $${item.price}`}</div>}
                {item.category && (
                  <div className="description">
                    Category:
                    {' '}
                    <Link to={`/Category/${item.category.name}`} onClick={() => setSelected('Category')}>{item.category.name}</Link>
                  </div>
                )}
                {item.createdBy === 'Admin' && (
                  <div className="description">
                    <b>NOT: </b>
                    Default categories or items cannot be changed or deleted.
                  </div>
                )}
                <div className="buttonContainer">
                  <button type="button" disabled={item.createdBy === 'Admin'} onClick={() => setEditMode(true)}>Edit</button>
                  <button type="button" onClick={handleDelete}>Delete</button>
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
