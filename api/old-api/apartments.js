//Currently not using this API
//It's using Supabase REST API, but now we use express for backend
//I believe its mostly used if you dont want to write SQL queries and is therefore less flexible

const supabaseUrl = "https://cxhrumyodgtznhfkavxz.supabase.co";

export default async function handler(req, res) {
  const { id } = req.query; // For DELETE requests

  if (req.method === "GET") {
    console.log("REQUEST Get APARTMENTS:", req.body); // Debugging
    const response = await fetch(`${supabaseUrl}/rest/v1/apartments`, {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();

    console.log("RESPONSE:", data); // Debugging
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
  try {
    console.log("Raw request body:", req.body); // Debugging

    const { street, address, apartment_number, size_sq_m, rent_cost, city } = req.body;

    console.log("Extracted street:", street); // Debugging

    if (!street || !address || !apartment_number || !size_sq_m || !rent_cost || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/apartments`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation" // Ensures full row is returned (like RETURNING *)
      },
      body: JSON.stringify({ street, address, apartment_number, size_sq_m, rent_cost, city, created_at: new Date().toISOString() }),
    });

    const responseData = await response.json();
    console.error("Supabase Insert Error Details:", responseData); // Debugging

    if (!response.ok) {
      return res.status(response.status).json({ error: responseData.message || response.statusText });
    }

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error adding apartment:", error);
    return res.status(500).json({ error: error.message });
  }
}


  if (req.method === "DELETE") {
    if (!id) return res.status(400).json({ error: "Apartment ID is required" });

    const response = await fetch(`${supabaseUrl}/rest/v1/apartments?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        "Prefer": "return=minimal", // Supabase expects this header for DELETE
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    return res.status(200).json({ message: "Apartment deleted" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

