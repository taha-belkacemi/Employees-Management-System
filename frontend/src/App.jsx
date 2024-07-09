import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/login';
import Register from './Components/register';
import Dashboard from './Components/dashboard';
import Category from './Components/Category';
import Profile from './Components/Profile';
import Employees from './Components/Employees';
import Home from './Components/Home';
import Addcategory from './Components/Addcategory';
import AddEmployees from './Components/AddEmployees';
import UpdateE from './Components/UpdateE';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="manage-employees" element={<Employees />} />
            <Route path="category" element={<Category />} />
            <Route path="profile" element={<Profile />} />
            <Route path="add_category" element={<Addcategory />} />
            <Route path="add_employees" element={<AddEmployees />} />
            <Route path="update_employee/:id" element={<UpdateE />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
