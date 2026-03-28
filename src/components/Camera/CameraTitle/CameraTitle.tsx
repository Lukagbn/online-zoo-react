"use client";
import React, { useEffect, useState } from "react";
import styles from "./CameraTitle.module.scss";
import Loader from "@/components/Loader/Loader";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";

interface CameraProps {
  id: number;
  commonName: string;
}

function CameraTitle({ id, onError }: { id: string; onError: () => void }) {
  const [cameraTitle, setCameraTitle] = useState<CameraProps | null>(null);

  async function fetchCameras() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        onError();
        return;
      }
      const result = await res.json();
      setCameraTitle(result.data);
    } catch (err) {
      onError();
      console.error("err:", err);
    }
  }
  useEffect(() => {
    fetchCameras();
  }, [id, onError]);

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
