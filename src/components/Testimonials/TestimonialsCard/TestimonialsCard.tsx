import React from "react";
import styles from "./TestimonialsCard.module.scss";

export interface TestimonialsProps {
  city: string;
  month: string;
  name: string;
  text: string;
  year: number;
}

function TestimonialsCard({
  city,
  month,
  name,
  text,
  year,
}: TestimonialsProps) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.cardHead}>
        <img src="/images/backticks.png" alt="backticks" />
        <h3>
          {city}, {month} {year}
        </h3>
      </div>
      <div className={styles.cardBody}>
        <p>{text}</p>
        <h4>{name}</h4>
      </div>
    </div>
  );
}

export default TestimonialsCard;
