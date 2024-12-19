"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirecting
import styles from "./profile.module.css"; // Import CSS module

interface Booking {
  id: number;
  library: string;
  room: string;
  attendees: number;
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("loggedIn");
      const id = localStorage.getItem("studentID");
      const name = localStorage.getItem("studentName");

      if (loggedIn === "true" && id) {
        setStudentID(id);
        setStudentName(name);
        setIsCheckingAuth(false);

        const fakeBookings: Booking[] = [
          {
            id: 1,
            library: "Robarts Library",
            room: "Room 203",
            attendees: 4,
            date: "2024-12-01",
            startTime: "10:00",
            endTime: "12:00",
          },
        ];
        setTimeout(() => {
          setUserBookings(fakeBookings);
          setLoading(false);
        }, 1000);
      } else {
        window.location.href = "/log_in";
      }
    }
  }, []);

  const handleDelete = (id: number) => {
    setUserBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

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
      <p className={styles.subtitle}>id: {studentID}</p>
      <h3 className={styles.subtitle}>Your Bookings</h3>
      {loading ? (
        <p>Loading bookings...</p>
      ) : userBookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {userBookings.map((booking) => (
            <li key={booking.id} className={styles.bookingItem}>
              <div>
                <strong>Library:</strong> {booking.library} <br />
                <strong>Room:</strong> {booking.room} <br />
                <strong>Date:</strong> {booking.date} <br />
                <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                <br />
                <strong>Attendees:</strong> {booking.attendees}
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
