"use client";
import AnimalBio from "@/components/AnimalBio/AnimalBio";
import AnimalBioDescription from "@/components/AnimalBio/AnimalBioDescription/AnimalBioDescription";
import DidYouKnow from "@/components/AnimalBio/DidYouKnow/DidYouKnow";
import DonationBanner from "@/components/DonationBanner/DonationBanner";
import FetchError from "@/components/FetchError/FetchError";
import Loader from "@/components/Loader/Loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const { id } = useParams();
  return (
    <>
      {/* <DonationBanner /> */}
      <DidYouKnow id={id as string} />
      <AnimalBio id={id as string} />
      <AnimalBioDescription id={id as string} />
    </>
  );
}

export default page;
