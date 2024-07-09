import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("http://localhost:8081/logout")
      .then(response => {
        navigate("/login"); // Redirect to login after logout
      })
      .catch(error => {
        console.error("There was an error logging out!", error);
      });
  };

  return (
    <div className="container-fluid">
      <style>
        {`
        /* Ensure all text is white on dark background for visibility */
        .bg-dark .text-white, .bg-dark .text-white a, .bg-dark .text-white .nav-link {
          color: #fff !important;
        }

        /* Full width for navigation links with appropriate padding and hover effect */
        .nav-link {
          display: block;
          padding: 10px 15px;
          width: 100%; 
          transition: background-color 0.3s, transform 0.3s;
        }

        /* Hover effect: lightens the background and enlarges the link slightly */
        .nav-link:hover, .nav-link:focus {
          background-color: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
          border-radius: 5px;
          cursor: pointer;
        }
        `}
      </style>
      <div className="row">
        <div className="col-md-3 p-0 bg-dark min-vh-100">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline text-danger"><strong>Code With Taha</strong></span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <Link to="/dashboard/home" className="nav-link align-middle">
                  <FaTachometerAlt className="me-2"/> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-employees" className="nav-link align-middle">
                  <FaUsers className="me-2"/> Manage Employees
                </Link>
              </li>
              <li>
                <Link to="/dashboard/category" className="nav-link align-middle">
                  <FaList className="me-2"/> Category
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="nav-link align-middle">
                  <FaUser className="me-2"/> Profile
                </Link>
              </li>
              <li>
                <span className="nav-link align-middle" onClick={handleLogout} style={{cursor: 'pointer'}}>
                  <FaSignOutAlt className="me-2"/> Logout
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-9 p-0">
          <div className="p-3">
            <h4 className="text-center">Employees Management System</h4>
          </div>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
