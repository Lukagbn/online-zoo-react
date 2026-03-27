import React, { useState } from "react";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import styles from "./CareCard.module.scss";
import Link from "next/link";

export interface CareCardProps {
  img: string;
  paragraph: string;
  alt: string;
}

function CareCard({ img, paragraph, alt }: CareCardProps) {
  return (
    <div className={styles.careCard}>
      <Link href="#"></Link>
      <div className={styles.cardHeader}>
        <img src={img} alt={alt} />
      </div>
      <div className={styles.cardBody}>
        <p>{paragraph}</p>
        <button type="button">
          feed
          <RightArrow color={"#f58021"} />
        </button>
      </div>
    </div>
  );
}

export default CareCard;
