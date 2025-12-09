import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const supabaseUrl = "https://cxhrumyodgtznhfkavxz.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  const response = await fetch(`${supabaseUrl}/rest/v1/users?username=eq.${username}`, {
    headers: {
      apiKey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: response.statusText });
  }

  const users = await response.json();
  if (users.length === 0) {
    return res.status(401).json({ error: "User not found" });
  }

  const user = users[0];

  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "your-secret-key", { expiresIn: "1m" });
  res.json({ token });
}
