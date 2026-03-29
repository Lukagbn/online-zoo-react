import React, { useEffect, useState } from "react";
import styles from "./TextBox.module.scss";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";

interface AnimalBioImages {
  id: number;
  url: string;
  alt: string;
}

interface AnimalBioProps {
  commonName: string;
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

export const ANIMAL_BIO_IMAGES: AnimalBioImages[] = [
  { id: 1, url: "/images/zoos/animalBio/panda.png", alt: "panda" },
  { id: 2, url: "/images/zoos/animalBio/lemur.png", alt: "lemur" },
  {
    id: 3,
    url: "/images/zoos/animalBio/gorillacongo.png",
    alt: "gorilla in congo",
  },
  { id: 4, url: "/images/zoos/animalBio/alligator.png", alt: "alligator" },
  { id: 5, url: "/images/zoos/animalBio/eagles.png", alt: "eagles" },
  { id: 6, url: "/images/zoos/animalBio/koala.png", alt: "koala" },
  { id: 7, url: "/images/zoos/animalBio/lion.png", alt: "lion" },
  { id: 8, url: "/images/zoos/animalBio/tiger.png", alt: "tiger" },
  { id: 9, url: "/images/zoos/animalBio/redpanda.webp", alt: "red panda" },
  { id: 10, url: "/images/zoos/animalBio/gorilla.png", alt: "gorilla" },
  { id: 11, url: "/images/zoos/animalBio/elephant.webp", alt: "elephant" },
  { id: 12, url: "/images/zoos/animalBio/seaotter.jpg", alt: "sea otter" },
  {
    id: 13,
    url: "/images/zoos/animalBio/bengaltiger.webp",
    alt: "bengal tiger",
  },
  { id: 14, url: "/images/zoos/animalBio/graywolf.webp", alt: "graywolf" },
  { id: 15, url: "/images/zoos/animalBio/fennecfox.webp", alt: "fennec fox" },
  {
    id: 16,
    url: "/images/zoos/animalBio/grizzlybear.webp",
    alt: "grizzly bear",
  },
  { id: 17, url: "/images/zoos/animalBio/dolphin.webp", alt: "dolphin" },
  {
    id: 18,
    url: "/images/zoos/animalBio/snowleopard.webp",
    alt: "snow leopard",
  },
  { id: 19, url: "/images/zoos/animalBio/polarbear.webp", alt: "polar bear" },
  { id: 20, url: "/images/zoos/animalBio/jaguar.webp", alt: "jaguar" },
  {
    id: 21,
    url: "/images/zoos/animalBio/ringtailedlemur.webp",
    alt: "ring tailed lemur",
  },
  { id: 22, url: "/images/zoos/animalBio/whiterhino.webp", alt: "white rhino" },
  { id: 23, url: "/images/zoos/animalBio/arcticfox.webp", alt: "arctic" },
  {
    id: 24,
    url: "/images/zoos/animalBio/saltwatercrocodile.webp",
    alt: "salt water crocodile",
  },
  {
    id: 25,
    url: "/images/zoos/animalBio/scarletmacaw.webp",
    alt: "scarlet macaw",
  },
  {
    id: 26,
    url: "/images/zoos/animalBio/komododragon.webp",
    alt: "komodo dragon",
  },
  { id: 27, url: "/images/zoos/animalBio/sloth.webp", alt: "sloth" },
  { id: 28, url: "/images/zoos/animalBio/cheetah.webp", alt: "cheetah" },
];

function TextBox({
  commonName,
  scientificName,
  type,
  size,
  diet,
  habitat,
  range,
  id,
  latitude,
  longitude,
}: AnimalBioProps) {
  const fields = [
    { title: "Common name:", value: commonName },
    { title: "Scientific name:", value: scientificName },
    { title: "Type:", value: type },
    { title: "Size:", value: size },
    { title: "Diet:", value: diet },
    { title: "Habitat:", value: habitat },
    { title: "Range:", value: range },
  ];
  const [hover, setHover] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const animalBioImg = ANIMAL_BIO_IMAGES[Number(id) - 1];
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=5&output=embed`;
  useEffect(() => {
    if (showMap) {
      document.documentElement.classList.add("noScroll");
      document.body.classList.add("noScroll");
    } else {
      document.documentElement.classList.remove("noScroll");
      document.body.classList.remove("noScroll");
    }
  }, [showMap]);
  return (
    <section className={styles.animalBio}>
      {animalBioImg ? (
        <img
          className={styles.img}
          src={animalBioImg.url}
          alt={animalBioImg.alt}
        />
      ) : (
        <p>Image not found!</p>
      )}
      <div className={styles.animalBioText}>
        {fields.map(({ title, value }) => (
          <div className={styles.textBox} key={title}>
            <h3>{title}</h3>
            <p>{value}</p>
            {title === "Range:" && (
              <button
                className={styles.viewMap}
                onClick={() => setShowMap(true)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                view map
                <RightArrow color={hover ? "white" : "#f58021"} />
              </button>
            )}
          </div>
        ))}
      </div>
      {showMap && (
        <div className={styles.overlay} onClick={() => setShowMap(false)}>
          <dialog
            open
            className={styles.animalMap}
            onClick={(e) => e.stopPropagation()}
          >
            <span onClick={() => setShowMap(false)}>X</span>
            <iframe
              src={mapSrc}
              allowFullScreen
              loading="lazy"
              width="100%"
              height="100%"
            />
          </dialog>
        </div>
      )}
    </section>
  );
}

export default TextBox;
