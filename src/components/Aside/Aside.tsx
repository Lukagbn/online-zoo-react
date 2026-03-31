import React, { useEffect, useState } from "react";
import styles from "./Aside.module.scss";
import AsideBox from "./AsideBox/AsideBox";
import FetchError from "../FetchError/FetchError";

interface AsideApiResponse {
  data: AsideBox[];
}
interface AsideBox {
  id: number;
  text: string;
}

function Aside({ id }: { id: string }) {
  const [cameras, seCameras] = useState<AsideBox[] | null>(null);
  const [error, setError] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandAside, setExpandAside] = useState(false);
  async function fetchCams() {
    try {
      const res = await fetch(
        "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/cameras",
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
  if (error) return <FetchError />;
  if (!cameras) return;
  return (
    <aside
      className={
        expandAside
          ? `${styles.aside} ${styles.expandAside} ${expand ? styles.asideActive : ""}`
          : `${styles.aside} ${expand ? styles.asideActive : ""}`
      }
    >
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
            key={aside.id}
            id={aside.id.toString()}
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
