"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import layout from "./layout.module.scss";
import Link from "next/link";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import DonationBanner from "@/components/DonationBanner/DonationBanner";
import PetCard from "@/components/PetSection/PetCard/PetCard";
import { useEffect, useRef, useState } from "react";
import LeftArrow from "@/components/ArrowButtons/LeftArrow/LeftArrow";
import PayAndFeed from "@/components/PayAndFeed/PayAndFeed";
import Testimonials from "@/components/Testimonials/Testimonials";
import Care from "@/components/Care/Care";
import TouchAnimal from "@/components/TouchAnimal/TouchAnimal";
import PetSection from "@/components/PetSection/PetSection";

export default function Home() {
  return (
    <>
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
      <section className={styles.heroIntro}>
        <div className={layout.container}>
          <div className={styles.introWelcome}>
            <img src="/images/online-zoo.png" alt="online zoo" />
            <div className={styles.heroIntroTextContent}>
              <h2>Welcome to the Online Zoo!</h2>
              <p>
                On our website, using live webcams, fans of all ages can observe
                various animals. Among them, are Giant pandas, eagles,
                alligators, forest gorillas, African lions, and others. It is
                the whole natural world in real-time in front of our cameras. We
                hope you will enjoy watching closely and explore animals’
                behavior and habitats! Note: animals are not always on view on
                cameras, so please check back if you don't see anything.
              </p>
            </div>
          </div>
          <div className={styles.introHow}>
            <img src="/images/eagles.png" alt="eagles" />
            <div className={styles.heroIntroTextContent}>
              <h2>How we work</h2>
              <p>
                Online Zoo is a nonprofit committed to inspiring awareness and
                preservation of nature and wild animals in our zoo and
                worldwide. Every day, our experts work to safeguard the health
                and wellness of the animals. To continue these efforts, we need
                your help. We're so grateful to our numerous supporters. All
                donations, large and small, go a long way to the conservation
                efforts of our pets.
              </p>
            </div>
          </div>
        </div>
      </section>
      <DonationBanner
        title="Your donation makes a difference!"
        paragraph="The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
      />
      <PetSection />
      <PayAndFeed />
      <Testimonials />
      <Care />
      <TouchAnimal />
    </>
  );
}
