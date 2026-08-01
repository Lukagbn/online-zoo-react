import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import styles from "./CareCard.module.scss";
import Link from "next/link";

export interface CareCardProps {
  img: string;
  paragraph: string;
  alt: string;
  title?: string;
  url?: string;
}

function CareCard({ img, paragraph, alt, title, url }: CareCardProps) {
  return (
    <div className={styles.careCard}>
      <Link href={url ?? "#"} aria-label="feed animal"></Link>
      <div className={styles.cardHeader}>
        <img src={img} alt={alt} />
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.title}>{title}</h2>
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
