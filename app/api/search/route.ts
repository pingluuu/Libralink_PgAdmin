import pool from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { libraryName, startTime, endTime, date } = body;

    console.log("Search Request:", { libraryName, startTime, endTime, date });

    // Validate input
    if (!libraryName || !startTime || !endTime || !date) {
      return new Response(JSON.stringify({ error: "Missing search parameters" }), { status: 400 });
    }

    const result = await pool.query(
        `
        SELECT 
          lr.library_name AS libraryName,
          lr.room_number AS roomNumber,
          $4::DATE AS date,
          $2::TIME AS startTime,
          $3::TIME AS endTime
        FROM library_rooms lr
        WHERE lr.library_name = $1
          AND lr.open_time <= $2::TIME
          AND lr.close_time >= $3::TIME
          AND lr.id NOT IN (
            SELECT b.room_id
            FROM bookings b
            WHERE b.booking_date = $4::DATE
              AND (
                b.start_time < $3::TIME AND 
                b.end_time > $2::TIME
              )
          )
        `,
        [libraryName, startTime, endTime, date]
      );
      
  

    console.log("Available Rooms:", result.rows);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "No available rooms found." }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: true, rooms: result.rows }), { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/search:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
