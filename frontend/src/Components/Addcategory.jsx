import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {
  const [Category, setCategory] = useState("");
  const navigate = useNavigate();

  function  Handlesubmit (event) {
    event.preventDefault();
    
    axios.post('http://localhost:8081/add_category', { Category })
    
    .then(res => {
      alert(res.data.message);
      navigate("/dashboard/Category");
  })
  .catch(err => {
      alert('Error adding add Category');
  });
    
    
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-4 rounded w-50 border bg-light shadow">
        <h4 className="text-center mb-4">Add Category</h4>
        <form onSubmit={Handlesubmit}>
          <div className="mb-3">
            <label htmlFor="Category" className="form-label">
              <strong>Category</strong>
            </label>
            <input
              type="text"
              id="Category"
              placeholder="Enter Category"
              className="form-control rounded-0"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success w-100">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
