import React, { useEffect, useState } from "react";
import styles from "./AnimalBioDescription.module.scss";
import FetchError from "@/components/FetchError/FetchError";
import Loader from "@/components/Loader/Loader";
import { PetProps } from "@/app/zoos/[id]/page";

function AnimalBioDescription({ petData }: { petData: PetProps | null }) {
  if (petData === null) return <FetchError />;
  if (!petData) return <Loader />;
  return (
    <div className={styles.animalBioIntro}>
      <p>{petData.detailedDescription}</p>
    </div>
  );
}

export default AnimalBioDescription;
