import styles from "./PetCard.module.scss";
import Link from "next/link";
import RightArrow from "../../ArrowButtons/RightArrow/RightArrow";
import { ANIMAL_BIO_IMAGES } from "@/utils/animalImages";

interface PetCardProps {
  _id: string;
  name: string;
  commonName: string;
  description: string;
}

function PetCard({ _id, name, commonName, description }: PetCardProps) {
  const petImage = ANIMAL_BIO_IMAGES.find((img) => img.id === _id);
  return (
    <div className={styles.petCard}>
      <Link href={`/zoos/${_id}`} aria-label="pet card"></Link>
      <div className={styles.cardHeader}>
        {petImage ? (
          <img src={petImage.url} alt={petImage.alt} />
        ) : (
          <img src="/images/eagles.webp" />
        )}
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
