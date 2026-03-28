import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import React from "react";
import styles from "./CameraCarousel.module.scss";

function CameraCarousel() {
  return (
    <button className={`${styles.viewLive} ${styles.bottom}`}>
      donate now
      <RightArrow color="white" />
    </button>
  );
}

export default CameraCarousel;
