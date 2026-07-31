"use client";
import FetchError from "../FetchError/FetchError";
import Loader from "../Loader/Loader";
import TextBox from "./TextBox/TextBox";
import styles from "./AnimalBio.module.scss";
import { PetProps } from "@/app/zoos/[id]/page";

function AnimalBio({ petData }: { petData: PetProps | null }) {
  if (petData === null) return <FetchError />;
  if (!petData) return <Loader />;
  return (
    <section className={styles.animalBio}>
      <TextBox
        key={petData.id}
        id={petData.animalId._id}
        commonName={petData.commonName}
        scientificName={petData.scientificName}
        type={""}
        size={petData.size}
        image={petData.image}
        diet={petData.diet}
        habitat={petData.habitat}
        range={petData.range}
        latitude={petData.latitude}
        longitude={petData.longitude}
      />
    </section>
  );
}

export default AnimalBio;
