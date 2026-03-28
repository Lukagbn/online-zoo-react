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

const ANIMAL_BIO_IMAGES: AnimalBioImages[] = [
  { id: 1, url: "/images/zoos/animalBio/pandaBio.png", alt: "panda" },
  { id: 2, url: "", alt: "" },
  { id: 3, url: "", alt: "" },
  { id: 4, url: "", alt: "" },
  { id: 5, url: "", alt: "" },
  { id: 6, url: "", alt: "" },
  { id: 7, url: "", alt: "" },
  { id: 8, url: "", alt: "" },
  { id: 9, url: "", alt: "" },
  { id: 10, url: "", alt: "" },
  { id: 11, url: "", alt: "" },
  { id: 12, url: "", alt: "" },
  { id: 13, url: "", alt: "" },
  { id: 14, url: "", alt: "" },
  { id: 15, url: "", alt: "" },
  { id: 16, url: "", alt: "" },
  { id: 17, url: "", alt: "" },
  { id: 18, url: "", alt: "" },
  { id: 19, url: "", alt: "" },
  { id: 20, url: "", alt: "" },
  { id: 21, url: "", alt: "" },
  { id: 22, url: "", alt: "" },
  { id: 23, url: "", alt: "" },
  { id: 24, url: "", alt: "" },
  { id: 25, url: "", alt: "" },
  { id: 26, url: "", alt: "" },
  { id: 27, url: "", alt: "" },
  { id: 28, url: "", alt: "" },
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
