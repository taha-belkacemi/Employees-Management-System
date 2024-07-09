const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const bcrypt = require("bcrypt");
const session = require("express-session");

const port = 8081;
const app = express();
app.use(express.json());

app.use(cors());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // for development only, should be true in production with HTTPS
}));

// for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    if (result.length > 0) {
      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = user; // Set user session
        res.status(200).send({ loginStatus: true });
      } else {
        res.status(401).send({ loginStatus: false, error: "Incorrect email or password" });
      }
    } else {
      res.status(404).send({ loginStatus: false, error: "User not found" });
    }
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      res.status(500).send("Database error");
      return;
    }
    if (result.length > 0) {
      res.status(409).send("Email already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err) => {
      if (err) {
        res.status(500).send("Error registering user");
      } else {
        res.status(201).send("User registered successfully");
      }
    });
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error logging out" });
    }
    res.status(200).send({ message: "Logged out successfully" });
  });
});

app.post("/add_category", async (req, res) => {
  const { Category } = req.body;
  const sql = "INSERT INTO category (Category) VALUES (?)";
  db.query(sql, [Category], (err) => {
    if (err) {
      res.status(500).send({ message: 'ERROR' });
      return;
    } else {
      res.status(201).send({ message: "Category registered successfully" });
    }
  });
});

app.get('/Category', async (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error fetching categories");
      return;
    }
    res.send(result);
  });
});

app.post('/add_Employees', upload.single('image'), (req, res) => {
  const { name, email, datebirth, category, salary } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO employees (name, email, date_of_birth, category, Salary, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, datebirth, category, salary, image], (err) => {
    if (err) {
      console.error('Error inserting employee:', err);
      res.status(500).json({ message: 'Error inserting employee', error: err.message });
      return;
    }
    res.status(201).json({ message: 'Employee registered successfully' });
  });
});

app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send({ message: 'Error fetching employees' });
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM employees WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching employee:', err);
      res.status(500).send({ message: 'Error fetching employee' });
    } else if (result.length === 0) {
      res.status(404).send({ message: 'Employee not found' });
    } else {
      res.status(200).send(result[0]);
    }
  });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employees WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).send({ message: 'Error deleting employee' });
    } else {
      res.status(200).send({ message: 'Employee deleted successfully' });
    }
  });
});

app.put('/employees/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, email, date_of_birth, category } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  const sql = 'UPDATE employees SET name = ?, email = ?, date_of_birth = ?, Category = ?, image = ? WHERE id = ?';
  db.query(sql, [name, email, date_of_birth, category, image, id], (err) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send({ message: 'Error updating employee' });
    } else {
      res.status(200).send({ message: 'Employee updated successfully' });
    }
  });
});

app.get('/admin_count', (req, res) => {
  let sql = 'SELECT COUNT(id) AS employees FROM employees';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send({ message: 'Error fetching employee count' });
    return res.status(200).json({ status: true, Result: result });
  });
});

app.get("/category_count", (req, res) => {
  let sql = "SELECT COUNT(id) AS category FROM category";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send({ message: "Error fetching category count" });
    return res.status(200).json({ status: true, Result: result });
  });
});

app.use('/salary_count',(req,res) => {
  let sql ='SELECT SUM(Salary) AS salary FROM employees';
  db.query(sql,(err,result) =>{
    if(err) return res.status(500).send({message:'ERROR fetching salary count'});
    return res.status(200).send({ status:true, Result:result });
  });
});

app.get("/admins", (req, res) => {
  let sql = 'SELECT * FROM admins';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching admins:', err);
      return res.status(500).send({ message: 'ERROR fetching admins' });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No admins found' });
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
