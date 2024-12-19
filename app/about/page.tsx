"use client";
import React from "react";
import styles from "./about.module.css";
import Link from "next/link";

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About LibraLink</h1>
      <p className={styles.paragraph}>
        <span className={styles.highlight}>Description:</span> LibraLink is a groundbreaking centralized web service designed to unify all University of Toronto library booking systems into one seamless and user-friendly platform. By leveraging cutting-edge technology, LibraLink aims to simplify the booking process, reduce search times, and eliminate inefficiencies, delivering a superior user experience while improving operational efficiency.
      </p>

      <section>
        <h2 className={styles.subtitle}>Key Objectives</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Identify Bottlenecks:</span> Conduct an in-depth analysis of the current library booking systems to uncover inefficiencies and areas requiring improvement, with a strong focus on user experience and system integration.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Simplify the Process:</span> Develop a unified, intuitive web interface that consolidates all room bookings across libraries. Enhance the platform with smart features like personalized room suggestions powered by Amazon Bedrock.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Enable Real-Time Monitoring:</span> Introduce tools for real-time room usage tracking and feedback collection, ensuring bookings are optimized and validated at the time of use.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.subtitle}>Improved Efficiency</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Minimize Conflicts:</span> Use real-time room status updates and tracking to drastically reduce double bookings and disputes, minimizing front desk interventions.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Streamline Front Desk Operations:</span> Automate conflict resolution and booking verifications, enabling staff to prioritize other essential tasks and improving overall service quality.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.subtitle}>Cost Efficiency</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Lower Staffing Costs:</span> Automating key processes reduces the reliance on front desk staff, leading to significant savings in labor expenses.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Centralized Maintenance:</span> With all booking systems consolidated, maintenance and updates are more streamlined, reducing the costs associated with managing multiple systems.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Optimize Resources:</span> Improved room utilization ensures better management of heating, lighting, and other resources, contributing to lower utility expenses.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.subtitle}>Anticipated Benefits</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Faster Bookings:</span> A streamlined interface and improved navigation will enable users to book rooms more quickly, saving valuable time for both students and staff.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Enhanced Service Quality:</span> By automating manual tasks and integrating smart technology, the system will significantly improve operational efficiency and staff productivity.
          </li>
          <li className={styles.listItem}>
            <span className={styles.highlight}>Superior User Experience:</span> Features such as real-time availability updates, personalized suggestions, and seamless feedback channels will ensure a user-friendly and responsive platform.
          </li>
        </ul>
      </section>

      <Link href="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
}
