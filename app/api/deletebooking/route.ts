import pool from "../../../lib/db";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: "Missing booking ID" }),
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM bookings WHERE booking_id = $1", [bookingId]);

    return new Response(
      JSON.stringify({ success: true, message: "Booking deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting booking:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
