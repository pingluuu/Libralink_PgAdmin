"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirecting
import styles from "./profile.module.css"; // Import CSS module

// Define the Booking type
interface Booking {
  id: number; // Booking ID
  library: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [studentName, setStudentName] = useState<string | null>(null);
  const [studentID, setStudentID] = useState<string | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Fetch bookings for the logged-in student
  const fetchBookings = async (studentId: string) => {
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "student-id": studentId, // Send the student ID in headers
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUserBookings(data.bookings); // Update the bookings state
      } else {
        console.error("Failed to fetch bookings:", data.error);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/deletebooking`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: id }), // Send the booking ID
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Remove the booking from the state
        setUserBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
      } else {
        alert(data.error || "Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  // Fetch student information and bookings on component load
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const id = localStorage.getItem("studentID");
    const name = localStorage.getItem("studentName");

    if (loggedIn === "true" && id) {
      setStudentID(id);
      setStudentName(name);
      setIsCheckingAuth(false);

      fetchBookings(id); // Fetch the bookings for this student
    } else {
      router.push("/log_in"); // Redirect to login if not logged in
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Clear login state
    localStorage.removeItem("studentID");
    localStorage.removeItem("studentName");
    router.push("/log_in"); // Redirect to login page
  };

  if (isCheckingAuth) {
    return <p>Checking authentication...</p>;
  }

  if (!studentID) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <p className={styles.subtitle}>Welcome, {studentName}</p>
      <p className={styles.subtitle}>ID: {studentID}</p>
      <h3 className={styles.subtitle}>Your Bookings</h3>
      {loading ? (
        <p>Loading bookings...</p>
      ) : userBookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {userBookings.map((booking) => (
            <li key={booking.id} className={styles.bookingItem}>
              <div>
                <strong>Booking ID:</strong> {booking.id} <br />
                <strong>Library:</strong> {booking.library} <br />
                <strong>Room:</strong> {booking.room} <br />
                <strong>Date:</strong> {booking.date} <br />
                <strong>Time:</strong> {booking.startTime} - {booking.endTime}
              </div>
              <button
                onClick={() => handleDelete(booking.id)}
                className={styles.deleteButton}
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noBookings}>You have no bookings at the moment.</p>
      )}

      <div className={styles.actions}>
        <Link href="/" className={styles.backButton}>
          Back to Home
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}
