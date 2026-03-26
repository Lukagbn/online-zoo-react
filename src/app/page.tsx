"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import layout from "./layout.module.scss";
import Link from "next/link";
import RightArrow from "@/components/RightArrow/RightArrow";
import DonationBanner from "@/components/DonationBanner/DonationBanner";
import PetCard from "@/components/PetCard/PetCard";
import { useEffect, useRef, useState } from "react";
import LeftArrow from "@/components/LeftArrow/LeftArrow";
import PayAndFeed from "@/components/PayAndFeed/PayAndFeed";

interface PetsApiResponse {
  data: PetsProps[];
}
interface PetsProps {
  id: number;
  name: string;
  commonName: string;
  description: string;
}

export default function Home() {
  const [pets, setPets] = useState<PetsProps[] | null>(null);
  const [hoverRight, setHoverRight] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverFav, setHoverFav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  async function fetchPets() {
    try {
      const res = await fetch(
        "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets",
      );
      const result: PetsApiResponse = await res.json();
      if (!res.ok) {
        console.log("Something went wrong. Please, refresh the page");
      }
      setPets(result.data);
    } catch (err) {
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
  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.heroContainer} ${layout.container}`}>
          <div className={styles.heroContent}>
            <h2>Watch your favorite animal online</h2>
            <p>
              Explore the exciting and mysterious world of wild animals in a
              natural setting without leaving your home.
            </p>
            <Link className={styles.viewLive} href="#">
              VIEW LIVE CAM
              <RightArrow color="white" />
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.heroIntro}>
        <div className={layout.container}>
          <div className={styles.introWelcome}>
            <img src="/images/online-zoo.png" alt="online zoo" />
            <div className={styles.heroIntroTextContent}>
              <h2>Welcome to the Online Zoo!</h2>
              <p>
                On our website, using live webcams, fans of all ages can observe
                various animals. Among them, are Giant pandas, eagles,
                alligators, forest gorillas, African lions, and others. It is
                the whole natural world in real-time in front of our cameras. We
                hope you will enjoy watching closely and explore animals’
                behavior and habitats! Note: animals are not always on view on
                cameras, so please check back if you don't see anything.
              </p>
            </div>
          </div>
          <div className={styles.introHow}>
            <img src="/images/eagles.png" alt="eagles" />
            <div className={styles.heroIntroTextContent}>
              <h2>How we work</h2>
              <p>
                Online Zoo is a nonprofit committed to inspiring awareness and
                preservation of nature and wild animals in our zoo and
                worldwide. Every day, our experts work to safeguard the health
                and wellness of the animals. To continue these efforts, we need
                your help. We're so grateful to our numerous supporters. All
                donations, large and small, go a long way to the conservation
                efforts of our pets.
              </p>
            </div>
          </div>
        </div>
      </section>
      <DonationBanner
        title="Your donation makes a difference!"
        paragraph="The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
      />
      <section className={styles.pets}>
        <div className={layout.container}>
          <div className={styles.petsInfo}>
            <h2>meet some our Pets</h2>
            <p>
              Do you have a special place in your heart for animals? Who are
              your favorites? Perhaps you'd like to donate to special ones or
              all our pets? We think it's important for you to choose how your
              donation is used.
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
      <PayAndFeed />
    </>
  );
}
