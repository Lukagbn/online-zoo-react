import Link from "next/link";
import styles from "./AsideBox.module.scss";
import { ASIDE_ICONS } from "@/utils/animalIcons";

function AsideBox({
  id,
  title,
  expand,
}: {
  id: string;
  title: string;
  expand: boolean;
}) {
  const icon = ASIDE_ICONS.find((icon) => icon.id.toString() == id);
  return (
    <div className={styles.asideBox}>
      <Link href={`/zoos/${id}`}>
        <img className={styles.panda} src={`${icon?.icon}`} alt="animal" />
      </Link>
      <p className={expand ? `${styles.expand}` : `${styles.collapse}`}>
        {title}
      </p>
    </div>
  );
}

export default AsideBox;
