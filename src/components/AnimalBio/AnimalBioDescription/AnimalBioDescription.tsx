import React, { useEffect, useState } from "react";
import styles from "./AnimalBioDescription.module.scss";
import FetchError from "@/components/FetchError/FetchError";
import Loader from "@/components/Loader/Loader";

interface PetDescApiData {
  data: PetDescProps;
}
interface PetDescProps {
  detailedDescription: string;
}

function AnimalBioDescription({ id }: { id: string }) {
  const [desc, setDesc] = useState<PetDescProps | null>(null);
  const [error, setError] = useState(false);
  async function fetchDesc() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        setError(true);
        return;
      }
      const result: PetDescApiData = await res.json();
      setDesc(result.data);
    } catch (err) {
      setError(true);
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchDesc();
  }, [id]);
  if (error) return <FetchError />;
  if (!desc) return <Loader />;
  return (
    <div className={styles.animalBioIntro}>
      <p>{desc.detailedDescription}</p>
    </div>
  );
}

export default AnimalBioDescription;
