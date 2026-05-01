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
import HeroSection from "@/components/HeroSection/HeroSection";
import HeroIntro from "@/components/HeroSection/HeroIntro/HeroIntro";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroIntro />
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
