import Link from "next/link";
import styles from "./not-found.module.scss";
import Image from "next/image";

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Image
        className={styles.notFoundImage}
        src={"/images/pageNotFound.png"}
        width={500}
        height={500}
        alt="page not found"
      />
    </div>
  );
}
export default NotFound;
