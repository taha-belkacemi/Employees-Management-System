import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [employeesTotal, setEmployeesTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      await EmployeesCount();
      await CategoryCount();
      await SalaryCount();
    };

    fetchCounts();

    axios.get('http://localhost:8081/admins')
      .then(res => {
        if (res.data) {
          setAdmins(res.data);
          setLoading(false);
        } else {
          alert('No admins found');
          setLoading(false);
        }
      })
      .catch(err => {
        alert('Error fetching admins: ' + err.message);
        setLoading(false);
      });
  }, []);

  const EmployeesCount = async () => {
    try {
      const result = await axios.get('http://localhost:8081/admin_count');
      if (result.data.status) {
        setEmployeesTotal(result.data.Result[0].employees);
      }
    } catch (err) {
      console.log('Error fetching employee count:', err);
    }
  };

  const CategoryCount = async () => {
    try {
      const result = await axios.get('http://localhost:8081/category_count');
      if (result.data.status) {
        setCategoryTotal(result.data.Result[0].category);
      }
    } catch (err) {
      console.log('Error fetching category count:', err);
    }
  };

  const SalaryCount = async () => {
    try {
      const result = await axios.get('http://localhost:8081/salary_count');
      if (result.data.status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    } catch (err) {
      console.log('Error fetching salary count:', err);
    }
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employees</h4>
            <hr />
            <div>
              <h5>Total: {employeesTotal}</h5>
            </div>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Category</h4>
            <hr />
            <div>
              <h5>Total: {categoryTotal}</h5>
            </div>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
            <hr />
            <div>
              <h5>Total: {salaryTotal}DA</h5>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>

        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
