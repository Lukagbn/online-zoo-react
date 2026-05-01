"use client";
import React, { useEffect, useState } from "react";
import styles from "./Aside.module.scss";
import AsideBox from "./AsideBox/AsideBox";
import FetchError from "../FetchError/FetchError";

interface AsideApiResponse {
  data: AsideBox[];
}
interface AsideBox {
  animalId: string;
  text: string;
}

function Aside({ id }: { id: string }) {
  const [cameras, seCameras] = useState<AsideBox[] | null>(null);
  const [error, setError] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandAside, setExpandAside] = useState(false);
  const [atTop, setAtTop] = useState(false);
  const asideClasses = [
    styles.aside,
    expandAside ? styles.expandAside : "",
    expand ? styles.asideActive : "",
    atTop ? styles.atTop : "",
  ]
    .filter(Boolean)
    .join(" ");
  async function fetchCams() {
    try {
      const res = await fetch(
        "https://online-zoo-backend.onrender.com/animals/cameras",
      );
      if (!res.ok) {
        setError(true);
        return;
      }
      const result: AsideApiResponse = await res.json();
      seCameras(result.data);
    } catch (err) {
      setError(true);
      console.log("error:", err);
    }
  }
  useEffect(() => {
    fetchCams();
  }, [id]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110) {
        setAtTop(true);
      } else {
        setAtTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (error) return <FetchError />;
  if (!cameras)
    return (
      <aside
        className={
          atTop ? `${styles.asideLoader} ${styles.atTop}` : styles.asideLoader
        }
      >
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={styles.asideBoxLoader}></div>
        ))}
      </aside>
    );
  return (
    <aside className={asideClasses}>
      <div className={styles.cameraWrapper}>
        <span>
          live <img src="/icons/camera.svg" alt="live" />
        </span>
        <img
          onClick={() => setExpand(!expand)}
          className={styles.arrowIcon}
          src="/icons/expandArrow.svg"
          alt="expand arrow"
        />
      </div>
      <div className={styles.asideBoxWrapper}>
        {cameras.map((aside) => (
          <AsideBox
            expand={expand}
            key={aside.animalId}
            id={aside.animalId}
            title={aside.text}
          />
        ))}
      </div>
      <div className={styles.arrowDown}>
        <img
          src="/icons/arrowdown.svg"
          alt="arrow down"
          onClick={() => setExpandAside(!expandAside)}
        />
      </div>
    </aside>
  );
}

export default Aside;
