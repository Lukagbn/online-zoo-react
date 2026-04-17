import React from "react";
import styles from "./Camera.module.scss";
import CameraTitle from "./CameraTitle/CameraTitle";
import { PetProps } from "@/app/zoos/[id]/page";

function Camera({ petData }: { petData: PetProps | null }) {
  return (
    <section className={styles.liveAnimal}>
      <div className={styles.innerContainer}>
        <div className={styles.liveAnimalHeader}>
          <CameraTitle petData={petData || null} />
          {petData?.video ? (
            <iframe
              className={styles.live}
              width="100%"
              height="100%"
              src={petData.video}
              title="Live Animal Cam"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No camera avaliable!</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Camera;
