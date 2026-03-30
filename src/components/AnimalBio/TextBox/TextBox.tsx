import React, { useEffect, useState } from "react";
import styles from "./TextBox.module.scss";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import { AnimalBioProps } from "@/utils/animalImages";
import { ANIMAL_BIO_IMAGES } from "@/utils/animalImages";

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
