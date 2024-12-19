import pool from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentID, password } = body;

    console.log("Incoming request data:", { studentID, password });

    // Validate input
    if (!studentID || !password) {
      return new Response(JSON.stringify({ error: "Missing credentials" }), { status: 400 });
    }

    // Query the database
    const result = await pool.query(
      "SELECT name FROM students WHERE student_id = $1 AND password = $2",
      [studentID, password]
    );

    console.log("Database query result:", result.rows);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const { name } = result.rows[0];

    return new Response(
      JSON.stringify({ success: true, message: "Login successful", name }),
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error("Error in /api/login:", err.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
