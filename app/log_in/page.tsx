"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [studentID, setStudentID] = useState(""); // To store the Student ID input
  const [password, setPassword] = useState(""); // To store the Password input
  const [error, setError] = useState(""); // To show error messages if login fails

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from refreshing

    try {
      // Make an API call to your backend login route
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentID, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store login information in localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("studentID", studentID);
        localStorage.setItem("studentName", data.name); // Optionally store the student's name

        // Redirect to the main page (home page)
        router.push("/");
      } else {
        setError(data.message || "Invalid Student ID or Password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Login</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        {/* Student ID Input */}
        <div style={styles.formGroup}>
          <label htmlFor="studentID" style={styles.label}>
            Student ID
          </label>
          <input
            type="text"
            id="studentID"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            style={styles.input}
            placeholder="Enter your Student ID"
          />
        </div>

        {/* Password Input */}
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your Password"
          />
        </div>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Login Button */}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

// Inline CSS styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    background: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "-10px",
  },
};
