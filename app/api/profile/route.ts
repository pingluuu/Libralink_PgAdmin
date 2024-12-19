// /api/bookings.ts
import pool from "../../../lib/db";

export async function GET(req: Request) {
  try {
    // Get student ID from the logged-in user (you can get it from the request or session)
    const studentId = req.headers.get('student-id'); // Or from the session

    if (!studentId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    // Query the database to get bookings for the student
    const result = await pool.query(
      `
      SELECT 
        b.booking_id AS id,
        lr.library_name AS library,
        lr.room_number AS room,
        b.booking_date AS date,
        TO_CHAR(b.start_time, 'HH24:MI') AS startTime,
        TO_CHAR(b.end_time, 'HH24:MI') AS endTime
      FROM bookings b
      JOIN library_rooms lr ON b.room_id = lr.id
      WHERE b.student_id = $1
      `,
      [studentId]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: true, bookings: [] }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, bookings: result.rows }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching bookings:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
