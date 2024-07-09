import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/Category')
      .then(result => {
        if (result.data) {
          setCategory(result.data);
        } else {
          alert(result.data.err);
        }
      }).catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <div className='d-flex justify-content-start mt-2'>
        <Link to="/dashboard/add_category" className='btn btn-success'>
          Add Category
        </Link>
      </div>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {Category.map((c, index) => (
              <tr key={index}>
                <td>{c.Category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
