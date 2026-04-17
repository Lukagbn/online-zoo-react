import React, { useEffect, useState } from "react";
import styles from "./DidYouKnow.module.scss";
import Loader from "@/components/Loader/Loader";
import FetchError from "@/components/FetchError/FetchError";
import { PetProps } from "@/app/zoos/[id]/page";

interface PetDescProps {
  description: string;
}

function DidYouKnow({ petData }: { petData: PetProps | null }) {
  if (petData === null) return <FetchError />;
  if (!petData) return <Loader />;
  return (
    <section className={styles.didYouKnow}>
      <h2>did you know?</h2>
      <p>{petData.description}</p>
    </section>
  );
}

export default DidYouKnow;
