"use client";
import React, { useEffect, useState } from "react";
import styles from "./CameraTitle.module.scss";
import Loader from "@/components/Loader/Loader";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import FetchError from "@/components/FetchError/FetchError";

interface CameraProps {
  id: number;
  commonName: string;
}

function CameraTitle({ id }: { id: string }) {
  const [cameraTitle, setCameraTitle] = useState<CameraProps | null>(null);
  const [error, setError] = useState(false);

  async function fetchCameras() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        setError(true);
        return;
      }
      const result = await res.json();
      setCameraTitle(result.data);
    } catch (err) {
      setError(true);
      console.error("err:", err);
    }
  }
  useEffect(() => {
    fetchCameras();
  }, [id]);

  if (error) return <FetchError />;
  if (!cameraTitle) return <Loader />;

  return (
    <div className={styles.liveAnimalHeaderWrapper}>
      <h2>{cameraTitle.commonName.trim().split(" ").at(-1)} cams</h2>
      <button className={styles.viewLive}>
        donate now
        <RightArrow color="white" />
      </button>
    </div>
  );
}

export default CameraTitle;
