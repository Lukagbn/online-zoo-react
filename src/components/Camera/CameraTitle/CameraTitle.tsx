"use client";
import React, { useEffect, useState } from "react";
import styles from "./CameraTitle.module.scss";
import Loader from "@/components/Loader/Loader";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import FetchError from "@/components/FetchError/FetchError";
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
