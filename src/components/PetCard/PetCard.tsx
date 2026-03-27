import React from "react";
import styles from "./PetCard.module.scss";
import Link from "next/link";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";

interface PetCardProps {
  id: number;
  name: string;
  commonName: string;
  description: string;
}

function PetCard({ id, name, commonName, description }: PetCardProps) {
  return (
    <div className={styles.petCard}>
      <Link href={`/zoos/${id}`}></Link>
      <div className={styles.cardHeader}>
        <img src="/images/eagles.png" />
        <p>{name}</p>
      </div>
      <div className={styles.cardBody}>
        <h3>{commonName}</h3>
        <p>{description}</p>
        <button className={styles.btnLive}>
          VIEW LIVE CAM
          <RightArrow color="#f58021" />
        </button>
      </div>
    </div>
  );
}

export default PetCard;
