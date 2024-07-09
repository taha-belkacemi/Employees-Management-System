import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Add_Employees = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("salary", salary);
    formData.append("datebirth", date);
    formData.append("category", selectedCategory);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://localhost:8081/add_Employees", formData)
      .then((res) => {
        alert(res.data.message);
        navigate("/dashboard/manage-employees");
      })
      .catch((err) => {
        console.error(
          "Error adding employee:",
          err.response ? err.response.data : err.message
        );
        alert("Error adding employee");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-4 rounded w-50 border bg-light shadow">
        <h4 className="text-center mb-4">Add Employees</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="Category" className="form-label">
              <strong>Category</strong>
            </label>
            <select
              name="Category"
              id="Category"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.Category}>
                  {c.Category}
                </option>
              ))}
            </select>

            <label htmlFor="date" className="form-label">
              <strong>Date of Birth</strong>
            </label>
            <input
              type="date"
              id="date"
              className="form-control rounded-0"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="name" className="form-label">
              <strong>Salary</strong>
            </label>
            <input
              type="text"
              id="salary"
              placeholder="Enter salary"
              className="form-control rounded-0"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <label htmlFor="image" className="form-label">
              <strong>Image</strong>
            </label>
            <input
              type="file"
              id="image"
              className="form-control rounded-0"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Employees;
