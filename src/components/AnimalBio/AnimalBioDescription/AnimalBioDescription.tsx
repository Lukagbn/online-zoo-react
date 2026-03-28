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

function AnimalBioDescription({
  id,
  onError,
}: {
  id: string;
  onError: () => void;
}) {
  const [desc, setDesc] = useState<PetDescProps | null>(null);
  async function fetchDesc() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        onError();
        return;
      }
      const result: PetDescApiData = await res.json();
      setDesc(result.data);
    } catch (err) {
      onError();
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchDesc();
  }, [id]);
  if (!desc) return <Loader />;
  return (
    <div className={styles.animalBioIntro}>
      <p>{desc.detailedDescription}</p>
    </div>
  );
}

export default AnimalBioDescription;
