"use client";
import React, { useEffect, useState } from "react";
import FetchError from "../FetchError/FetchError";
import Loader from "../Loader/Loader";
import TextBox from "./TextBox/TextBox";
import styles from "./AnimalBio.module.scss";

interface PetApiData {
  data: PetProps;
}
interface PetProps {
  commonName: string;
  description: string;
  detailedDescription: string;
  diet: string;
  habitat: string;
  id: number;
  latitude: string;
  longitude: string;
  range: string;
  scientificName: string;
  size: string;
  type: string;
}

function AnimalBio({ id, onError }: { id: string; onError: () => void }) {
  const [petData, setPetData] = useState<PetProps | null>(null);
  const [error, setError] = useState(false);
  async function fetchPet() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        onError();
        return;
      }
      const result: PetApiData = await res.json();
      setPetData(result.data);
    } catch (err) {
      onError();
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchPet();
  }, [id]);
  if (!petData) return <Loader />;

  return (
    <section className={styles.animalBio}>
      <TextBox
        key={petData.id}
        id={petData.id}
        commonName={petData.commonName}
        scientificName={petData.scientificName}
        type={petData.type}
        size={petData.size}
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
