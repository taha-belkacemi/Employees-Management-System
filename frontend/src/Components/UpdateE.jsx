import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateE = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    date_of_birth: '',
    category: '',
    image: '',
    salary: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/Category")
      .then((result) => {
        if (result.data) {
          setCategories(result.data);
        } else {
          alert(result.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/employees/${id}`)
      .then(res => {
        setEmployee(res.data);
      })
      .catch(err => {
        console.log('Error fetching employee:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('date_of_birth', employee.date_of_birth);
    formData.append('Category', employee.Category);
    if (image) {
      formData.append('image', image);
    }

    axios.put(`http://localhost:8081/employees/${id}`, formData)
      .then(res => {
        alert(res.data.message);
        navigate('/dashboard/manage-employees');
      })
      .catch(err => {
        console.log('Error updating employee:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Update Employee</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="date_of_birth"
            value={employee.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="Category"
            className="form-select"
            value={employee.Category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.Category}>
                {c.Category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateE;
