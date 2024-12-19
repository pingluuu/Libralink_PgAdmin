"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

// Define the Room type
interface Room {
  id: number;
  library: string;
  roomNumber: string;
  capacity: number;
  openTime: string;
  closeTime: string;
}

export default function Home() {
  const router = useRouter();

  // State Hooks
  const [selectedLibrary, setSelectedLibrary] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [attendees, setAttendees] = useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("loggedIn");
      if (!isLoggedIn) {
        router.push("/log_in"); // Redirect to login if not logged in
      }
    }
  }, [router]);

  // Dummy Libraries List
  const libraries: string[] = [
    "Robarts Library",
    "Gerstein Library",
    "E.J. Pratt Library",
    "OISE Library",
    "Architecture, Landscape, and Design (Eberhard Zeidler Library)",
    "Dentistry Library (Harry R. Abbott)",
    "Engineering & Computer Science Library",
    "Law Library (Bora Laskin)",
    "Music Library",
    "Regis College Library",
  ];

  // Handle Room Search
  const handleSearch = () => {
    setLoading(true);
    const hardcodedRooms: Room[] = [
      {
        id: 1,
        library: "Robarts Library",
        roomNumber: "203",
        capacity: 6,
        openTime: "09:00",
        closeTime: "21:00",
      },
      {
        id: 2,
        library: "Gerstein Library",
        roomNumber: "105",
        capacity: 4,
        openTime: "10:00",
        closeTime: "20:00",
      },
      {
        id: 3,
        library: "E.J. Pratt Library",
        roomNumber: "302",
        capacity: 8,
        openTime: "08:00",
        closeTime: "22:00",
      },
    ];

    setTimeout(() => {
      setRooms(hardcodedRooms);
      setLoading(false);
    }, 500);
  };

  // Handle Room Booking
  const handleBookRoom = (room: Room) => {
    alert(`You have booked Room ${room.roomNumber} at ${room.library}`);
  };

  // Components
  const Header = () => (
    <header className={styles.header}>
      <Image
        src="/images/logo.png"
        alt="LibraLink Logo"
        width={150}
        height={140}
        priority
      />
      <nav className={styles.nav}>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/profile" className={styles.navLink}>
          Profile
        </Link>
      </nav>
    </header>
  );

  const SearchForm = () => (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Search for a Room</h2>
      <form className={styles.bookingForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Select Library:
              <select
                value={selectedLibrary}
                onChange={(e) => setSelectedLibrary(e.target.value)}
                className={styles.input}
              >
                <option value="">-- All Libraries --</option>
                {libraries.map((library) => (
                  <option key={library} value={library}>
                    {library}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Select Date:
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              End Time:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Number of Attendees:
              <input
                type="number"
                min="1"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>
        </div>

        <button type="button" onClick={handleSearch} className={styles.button}>
          Search Available Rooms
        </button>
      </form>
    </div>
  );

  const RoomResults = () => (
    <div className={styles.results}>
      {loading ? (
        <p>Loading rooms...</p>
      ) : rooms.length > 0 ? (
        <ul className={styles.roomList}>
          {rooms.map((room) => (
            <li key={room.id} className={styles.roomItem}>
              <div>
                <strong>Library:</strong> {room.library} <br />
                <strong>Room:</strong> {room.roomNumber} <br />
                <strong>Capacity:</strong> {room.capacity} <br />
                <strong>Available From:</strong> {room.openTime} - {room.closeTime}
              </div>
              <button
                className={styles.bookButton}
                onClick={() => handleBookRoom(room)}
              >
                Book
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rooms available. Click "Search Available Rooms" to view rooms.</p>
      )}
    </div>
  );

  const Footer = () => (
    <footer className={styles.footer}>
      <p>
        Powered by <strong>LibraLink</strong> © 2024
      </p>
    </footer>
  );

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Find Your Perfect Study Space</h1>
          <p className={styles.subtitle}>
            Book a study room in any UofT library quickly and easily.
          </p>
        </div>
        <SearchForm />
        <RoomResults />
      </main>
      <Footer />
    </div>
  );
}
