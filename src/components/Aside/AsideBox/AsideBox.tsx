import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./AsideBox.module.scss";

function AsideBox({ id, title }: { id: string; title: string }) {
  console.log(title);
  return (
    <div className={styles.asideBox}>
      <Link href={`/zoos/${id}`}>
        <img className={styles.panda} src="/icons/panda.svg" alt="panda" />
        <img
          className={styles.pandaLg}
          src="/icons/pandalarge.svg"
          alt="panda"
        />
      </Link>
      <p>{title}</p>
    </div>
  );
}

export default AsideBox;
