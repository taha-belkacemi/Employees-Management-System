import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/employees')
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching employees');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (err) {
      console.error(err); // Better error handling
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employees List</h3>
      </div>
      <div className="d-flex justify-content-start mt-2">
        <Link to="/dashboard/add_employees" className="btn btn-success">
          Add Employees
        </Link>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Category</th>
              <th>Salary</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, index) => (
              <tr key={index}>
                <td>{e.name}</td>
                <td>{new Date(e.date_of_birth).toLocaleDateString('en-US')}</td>  
                <td>{e.email}</td>
                <td>{e.Category}</td>
                <td>{e.Salary}</td>
                <td>
                  {e.image && (
                    <img
                      src={`http://localhost:8081/uploads/${e.image}`}
                      alt={e.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/dashboard/update_employee/${e.id}`} className="btn btn-primary ms-4 mb-3">
                    Update
                  </Link>
                  <button className="btn btn-danger ms-4 mb-3" onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
