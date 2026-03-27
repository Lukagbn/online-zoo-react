import Markers from "@/components/Markers/Markers";
import React from "react";
import styles from "./page.module.scss";

function page() {
  return (
    <section className={styles.mapContainer}>
      <h2>find where are the animals live</h2>
      <div className={styles.map}>
        <Markers />
      </div>
    </section>
  );
}

export default page;
