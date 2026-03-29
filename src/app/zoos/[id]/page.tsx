"use client";
import AnimalBio from "@/components/AnimalBio/AnimalBio";
import AnimalBioDescription from "@/components/AnimalBio/AnimalBioDescription/AnimalBioDescription";
import Camera from "@/components/Camera/Camera";
import CameraTitle from "@/components/Camera/CameraTitle/CameraTitle";
import DidYouKnow from "@/components/AnimalBio/DidYouKnow/DidYouKnow";
import DonationBanner from "@/components/DonationBanner/DonationBanner";
import FetchError from "@/components/FetchError/FetchError";
import Loader from "@/components/Loader/Loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import CameraCarousel from "@/components/Camera/CameraCarousel/CameraCarousel";
import Aside from "@/components/Aside/Aside";

function page() {
  const { id } = useParams();
  const [hasError, setHasError] = useState(false);
  if (hasError) return <FetchError className={styles.zoosError} />;
  return (
    <>
      <Aside id={id as string} />
      <Camera id={id as string} />
      <section className={styles.contentWrapper}>
        <CameraCarousel />
        <DonationBanner
          className={styles.donationBanner}
          title="Your donation makes a difference!"
          paragraph="The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
        />
        <DidYouKnow id={id as string} />
        <AnimalBio id={id as string} />
        <AnimalBioDescription id={id as string} />
      </section>
    </>
  );
}

export default page;
