"use client";
import React, { useEffect, useState } from "react";
import CareCard from "@/components/Care/CareCard/CareCard";
import { ANIMAL_BIO_IMAGES } from "@/utils/animalImages";
import styles from "./page.module.scss";
import Loader from "@/components/Loader/Loader";
import FetchError from "@/components/FetchError/FetchError";

interface PetsApiResponse {
  data: PetsData[];
}

interface PetsData {
  _id: string;
  name: string;
  commonName: string;
  description: string;
  img: string[];
}

function Page() {
  const [petCard, setPetCard] = useState<PetsData[] | null>(null);
  const [error, setError] = useState(false);
  async function fetchPets() {
    try {
      const res = await fetch(
        "https://online-zoo-backend.onrender.com/animals",
      );
      if (!res.ok) {
        setError(true);
      }
      const result: PetsApiResponse = await res.json();
      setPetCard(result.data);
    } catch (err) {
      setError(true);
      console.log("error:", err);
    }
  }

  useEffect(() => {
    fetchPets();
  }, []);
  if (error) return <FetchError />;
  if (!petCard) return <Loader />;

  return (
    <section className={styles.feedContainer}>
      <h2>Feed Animals You Love!</h2>
      <div className={styles.feedCardWrapper}>
        {petCard?.map((card, index) => {
          const image = ANIMAL_BIO_IMAGES.find((img) => img.id === card._id);
          console.log(card, ANIMAL_BIO_IMAGES[index].id);
          return (
            <CareCard
              key={card._id}
              url={`feed/${card._id}`}
              img={image?.url || ""}
              title={card.name}
              alt={image?.alt || card.commonName}
              paragraph={card.description}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Page;
