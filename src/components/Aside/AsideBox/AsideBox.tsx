"use client";
import Link from "next/link";
import styles from "./AsideBox.module.scss";
import { ASIDE_ICONS } from "@/utils/animalIcons";
import { usePathname } from "next/navigation";

function AsideBox({
  id,
  title,
  expand,
}: {
  id: string;
  title: string;
  expand: boolean;
}) {
  const pathname = usePathname();
  const icon = ASIDE_ICONS.find((icon) => icon.id.toString() == id);
  const isActive = pathname == `/zoos/${id}`;
  return (
    <div
      className={
        isActive
          ? `${styles.asideBox} ${styles.asideBoxActive}`
          : `${styles.asideBox}`
      }
    >
      <Link href={`/zoos/${id}`}>
        <div
          className={
            isActive
              ? `${styles.imgWrapper} ${styles.imgWrapperActive}`
              : `${styles.imgWrapper}`
          }
        >
          <img className={styles.animal} src={`${icon?.icon}`} alt="animal" />
        </div>
      </Link>
      <p className={expand ? `${styles.expand}` : `${styles.collapse}`}>
        {title}
      </p>
    </div>
  );
}

export default AsideBox;
