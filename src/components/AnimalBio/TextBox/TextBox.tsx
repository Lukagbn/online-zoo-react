import React, { useState } from "react";
import styles from "./TextBox.module.scss";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";

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

function TextBox({
  commonName,
  scientificName,
  type,
  size,
  diet,
  habitat,
  range,
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
  return (
    <section className={styles.animalBio}>
      <img src="/images/zoos/pandabio.png" alt="baby panda" />
      <div className={styles.animalBioText}>
        {fields.map(({ title, value }) => (
          <div className={styles.textBox} key={title}>
            <h3>{title}</h3>
            <p>{value}</p>
            {title === "Range:" && (
              <button
                className={styles.viewMap}
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
    </section>
  );
}

export default TextBox;
