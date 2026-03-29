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
    <aside className={`${styles.aside} ${expand ? styles.asideActive : ""}`}>
      <div className={styles.asideBox}>
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
      {cameras.map((aside) => (
        <AsideBox key={aside.id} id={aside.id.toString()} title={aside.text} />
      ))}
    </aside>
  );
}

export default Aside;
