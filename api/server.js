console.log("Server is running and listening for requests...");
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Enables JSON parsing

console.log("Server is running and listening for requests... 2");
//console.log("DB_USER:", process.env.DB_USER);
//console.log("DB_HOST:", process.env.DB_HOST);
//console.log("DB_NAME:", process.env.DB_NAME);
//console.log("DB_PASS:", process.env.DB_PASS);


// PostgreSQL Database Connection
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to PostgreSQL:", res.rows);
});

// Start Express server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});


app.get("/apartments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM apartments");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/apartments/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Received GET request for apartment ID: ${id}`); // Debugging

  try {
    const result = await pool.query("SELECT * FROM apartments WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching apartment:", err);
    res.status(500).json({ error: err.message });
  }
});
  
app.post("/apartments", async (req, res) => {
    const { street, address, apartment_number, size_sq_m, rent_cost, city } = req.body;
    console.log("Received POST request to /apartments"); // Debugging
    console.log("Incoming request body:", req.body); // Debugging

    if (!street || !address || !apartment_number || !size_sq_m || !rent_cost || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const result = await pool.query(
        `INSERT INTO apartments (street, address, apartment_number, size_sq_m, rent_cost, city) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [street, address, apartment_number, size_sq_m, rent_cost, city]
      );
      res.status(201).json(result.rows[0]); // Send back the newly created apartment
    } catch (err) {
      console.error("Error adding apartment:", err);

      if (err.code === "23505") { // Postgres unique violation
        return res.status(409).json({ error: "Apartment already exists" });
      }

      res.status(500).json({ error: err.message });
    }
});

app.delete("/apartments/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Received DELETE request for apartment ID: ${id}`); // Debugging

  try {
      const result = await pool.query("DELETE FROM apartments WHERE id = $1 RETURNING *", [id]);
      
      if (result.rowCount === 0) {
          return res.status(404).json({ error: "Apartment not found" });
      }

      console.log("Deleted apartment:", result.rows[0]); // Debugging
      res.status(200).json({ message: "Apartment deleted", deletedApartment: result.rows[0] });
  } catch (err) {
      console.error("Error deleting apartment:", err);
      res.status(500).json({ error: err.message });
  }
});

app.put("/apartments/:id", async (req, res) => {
  const { id } = req.params;
  const { street, address, apartment_number, size_sq_m, rent_cost, city } = req.body;

  if (!street || !address || !apartment_number || !size_sq_m || !rent_cost || !city) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `UPDATE apartments 
       SET street = $1, address = $2, apartment_number = $3, size_sq_m = $4, rent_cost = $5, city = $6
       WHERE id = $7
       RETURNING *`,
      [street, address, apartment_number, size_sq_m, rent_cost, city, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    // Success
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating apartment:", err);

    // Handle unique constraint violation (e.g. duplicate apartment_number)
    if (err.code === "23505") {
      return res.status(409).json({ error: "Apartment already exists" });
    }

    res.status(500).json({ error: err.message });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("SQL Query:", "SELECT * FROM users WHERE username = $1", [username]);


  pool.query("SELECT * FROM users WHERE username = $1", [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.rows.length === 0) {
      console.error("No user found with username:", username);
      return res.status(401).json({ error: "User not found" });
    }

    const user = results.rows[0];
    console.log("Retrieved user from database:", user); // Debugging

    // Check if password hashing is working
    console.log("Stored password hash:", user.password_hash);
    console.log("Input password:", password);

    // Compare password using bcrypt
    const isValidPassword = bcrypt.compareSync(password, user.password_hash);
    console.log("Is valid password:", isValidPassword); // Debugging

    if (!isValidPassword) {
      console.error("Password does NOT match!");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "your-secret-key", { expiresIn: "30m" });

    res.json({ token });
  });
});