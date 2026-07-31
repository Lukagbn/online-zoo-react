"use client";
import styles from "./CameraTitle.module.scss";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import { PetProps } from "@/app/zoos/[id]/page";

function CameraTitle({ petData }: { petData: PetProps | null }) {
  return (
    <div className={styles.liveAnimalHeaderWrapper}>
      <h2>{petData?.commonName.trim().split(" ").at(-1)} cams</h2>
      <button className={styles.viewLive}>
        donate now
        <RightArrow color="white" />
      </button>
    </div>
  );
}

export default CameraTitle;
