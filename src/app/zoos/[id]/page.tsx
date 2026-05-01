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

interface PetId {
  commonName: string;
  description: string;
  name: string;
  _id: string;
}

export interface PetProps {
  animalId: PetId;
  commonName: string;
  description: string;
  detailedDescription: string;
  diet: string;
  habitat: string;
  id: string;
  latitude: string;
  longitude: string;
  range: string;
  scientificName: string;
  size: string;
  image: string;
  video: string;
}

function page() {
  const { id } = useParams();
  const [petData, setPetData] = useState<PetProps | null>(null);
  async function fetchPet() {
    try {
      const res = await fetch(
        `https://online-zoo-backend.onrender.com/animals/details/${id}`,
      );
      const result: PetProps = await res.json();
      setPetData(result);
      if (!res.ok) {
        console.log("error");
      }
    } catch (err) {
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchPet();
  }, [id]);
  return (
    <>
      <Aside id={id as string} />
      <Camera petData={petData || null} />
      <section className={styles.contentWrapper}>
        <CameraCarousel />
        <DonationBanner
          className={styles.donationBanner}
          title="Your donation makes a difference!"
          paragraph="The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!"
        />
        <DidYouKnow petData={petData || null} />
        <AnimalBio petData={petData || null} />
        <AnimalBioDescription petData={petData || null} />
      </section>
    </>
  );
}

export default page;
