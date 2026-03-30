import React, { useState } from "react";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import CareCard from "./CareCard/CareCard";
import styles from "./Care.module.scss";
import { CareCardProps } from "./CareCard/CareCard";
import Link from "next/link";

function Care() {
  const CARE_CARDS: CareCardProps[] = [
    {
      img: "/images/lucas.png",
      paragraph: `Your $30 could give Lucas a slice of panda cake, made with our secret recipe.`,
      alt: "lucas",
    },
    {
      img: "/images/andy.png",
      paragraph: `With your support, we can give Andy his favorite fruits. Especially when it's not fruit season in its natural habitat.`,
      alt: "andy",
    },
    {
      img: "/images/senja.png",
      paragraph: `Your $150 will help to care for Senja, a Sumatran tiger, for three weeks.`,
      alt: "senja",
    },
    {
      img: "/images/samlora.png",
      paragraph: `Sam & Lora have hatched and raised numerous young and will be happy with your help.`,
      alt: "sam & lora",
    },
  ];
  const [hover, setHover] = useState(false);
  return (
    <section className={styles.care}>
      <div className={styles.careContainer}>
        <div className={styles.careHeader}>
          <h2>care for the animals you love</h2>
          <p>
            You can help to look after the animals you love with your gift today
          </p>
        </div>
        <div className={styles.careCardsWrapper}>
          <img
            className={styles.koalaBanner}
            src="/images/careKoala.png"
            alt="koala"
          />
          {CARE_CARDS.map((item, index) => (
            <CareCard
              key={index}
              img={item.img}
              paragraph={item.paragraph}
              alt={item.alt}
            />
          ))}
        </div>
        <div className={styles.careCardDots}>
          <div className={styles.dotActive}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <button
          type="button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Link href={"/feed"}>Feed Your Favourite</Link>
          <RightArrow color={hover ? "white" : "#20113d"} />
        </button>
      </div>
    </section>
  );
}

export default Care;
