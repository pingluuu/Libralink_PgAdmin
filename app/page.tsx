"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

// Define the Room type
interface Room {
  id: number;
  libraryname: string;
  roomnumber: string;
  date: string;
  starttime: string;
  endtime: string;
}

export default function Home() {
  const router = useRouter();

  // Libraries List
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

  // State Hooks
  const [selectedLibrary, setSelectedLibrary] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(""); // Initialize with an empty string

  // Redirect to login if not logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("loggedIn");
      if (!isLoggedIn) {
        router.push("/log_in");
      }
    }
  }, [router]);

  // Handle Room Search
  const handleSearch = async () => {
    if (!selectedLibrary || !selectedDate || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libraryName: selectedLibrary,
          startTime,
          endTime,
          date: selectedDate,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setRooms(data.rooms);
      } else {
        alert(data.error || "No rooms available.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = async (room: Room) => {
    const studentId = localStorage.getItem("studentID");
  
    if (!studentId) {
      alert("Please log in to book a room.");
      router.push("/log_in");
      return;
    }
  
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          roomId: room.id, // Use `id` from Room type
          date: room.date, // Use `date` from Room type
          startTime: room.starttime, // Use `starttime` from Room type
          endTime: room.endtime, // Use `endtime` from Room type
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        alert("Room booked successfully!");
      } else {
        alert(data.error || "Failed to book the room.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  

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
                <option value="">-- Select a Library --</option>
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
                <strong>Library:</strong> {room.libraryname} <br />
                <strong>Room:</strong> {room.roomnumber} <br />
                <strong>Date:</strong> {new Date(room.date).toLocaleDateString()} <br />
                <strong>Time:</strong> {room.starttime} - {room.endtime}
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
