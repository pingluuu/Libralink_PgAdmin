import pool from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, roomId, date, startTime, endTime } = body;

    console.log("Booking Request:", { studentId, roomId, date, startTime, endTime });

    // Validate input
    if (!studentId || !roomId || !date || !startTime || !endTime) {
      return new Response(JSON.stringify({ error: "Missing booking parameters" }), { status: 400 });
    }

    // Insert booking into the database
    await pool.query(
      `
      INSERT INTO bookings (student_id, room_id, booking_date, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [studentId, roomId, date, startTime, endTime]
    );

    return new Response(JSON.stringify({ success: true, message: "Booking successful!" }), { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/book:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
