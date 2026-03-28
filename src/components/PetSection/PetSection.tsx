import React, { useEffect, useRef, useState } from "react";
import styles from "./PetSection.module.scss";
import layout from "@/app/layout.module.scss";
import LeftArrow from "../ArrowButtons/LeftArrow/LeftArrow";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import PetCard from "./PetCard/PetCard";
import FetchError from "../FetchError/FetchError";
import Loader from "../Loader/Loader";

interface PetsApiResponse {
  data: PetsProps[];
}
interface PetsProps {
  id: number;
  name: string;
  commonName: string;
  description: string;
}

function PetSection() {
  const [pets, setPets] = useState<PetsProps[] | null>(null);
  const [hoverRight, setHoverRight] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverFav, setHoverFav] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  async function fetchPets() {
    try {
      const res = await fetch(
        "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets",
      );
      const result: PetsApiResponse = await res.json();
      if (!res.ok) {
        setError(true);
        console.log("Something went wrong. Please, refresh the page");
      }
      setPets(result.data);
    } catch (err) {
      setError(true);
      console.log("error:", err);
    }
  }
  const scrollRight = () => {
    if (!containerRef.current) return;
    const { scrollLeft, offsetWidth, scrollWidth } = containerRef.current;
    const isAtEnd = scrollLeft + offsetWidth >= scrollWidth;
    if (isAtEnd) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const scrollLeft = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth } = containerRef.current;
    const isAtStart = scrollLeft <= 0;
    if (isAtStart) {
      containerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  useEffect(() => {
    fetchPets();
  }, []);
  if (error) return <FetchError />;
  if (!pets) return <Loader />;
  return (
    <section className={styles.pets}>
      <div className={layout.container}>
        <div className={styles.petsInfo}>
          <h2>meet some our Pets</h2>
          <p>
            Do you have a special place in your heart for animals? Who are your
            favorites? Perhaps you'd like to donate to special ones or all our
            pets? We think it's important for you to choose how your donation is
            used.
          </p>
          <div className={styles.btnContainer}>
            <button
              type="button"
              onMouseEnter={() => setHoverLeft(true)}
              onMouseLeave={() => setHoverLeft(false)}
            >
              <LeftArrow
                onClick={() => scrollLeft()}
                color={hoverLeft ? "white" : "#20113d"}
              />
            </button>
            <button
              type="button"
              className="right-arrow-btn"
              onMouseEnter={() => setHoverRight(true)}
              onMouseLeave={() => setHoverRight(false)}
            >
              <RightArrow
                onClick={() => scrollRight()}
                color={hoverRight ? "white" : "#20113d"}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.petsCardContainer} ref={containerRef}>
        {pets?.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            commonName={pet.commonName}
            description={pet.description}
          />
        ))}
      </div>
      <div className={layout.container}>
        <button
          className={styles.chooseFav}
          type="button"
          onMouseEnter={() => setHoverFav(true)}
          onMouseLeave={() => setHoverFav(false)}
        >
          choose your favourite
          <RightArrow color={hoverFav ? "white" : "#20113d"} />
        </button>
      </div>
    </section>
  );
}

export default PetSection;
