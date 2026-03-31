import Link from "next/link";
import React, { useEffect, useState } from "react";
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
        {/* <img
          className={styles.pandaLg}
          src="/icons/pandalarge.svg"
          alt="panda"
        /> */}
      </Link>
      <p className={expand ? `${styles.expand}` : `${styles.collapse}`}>
        {title}
      </p>
    </div>
  );
}

export default AsideBox;
