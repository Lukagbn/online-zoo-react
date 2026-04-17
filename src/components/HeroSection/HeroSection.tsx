import React from "react";
import styles from "./HeroSection.module.scss";
import Link from "next/link";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import layout from "@/app/layout.module.scss";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} ${layout.container}`}>
        <div className={styles.heroContent}>
          <h2>Watch your favorite animal online</h2>
          <p>
            Explore the exciting and mysterious world of wild animals in a
            natural setting without leaving your home.
          </p>
          <Link className={styles.viewLive} href="/zoos/1">
            VIEW LIVE CAM
            <RightArrow color="white" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
