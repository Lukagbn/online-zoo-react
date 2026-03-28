import React, { useEffect, useState } from "react";
import styles from "./DidYouKnow.module.scss";
import Loader from "@/components/Loader/Loader";

interface PetDescApiData {
  data: PetDescProps;
}
interface PetDescProps {
  description: string;
}

function DidYouKnow({ id, onError }: { id: string; onError: () => void }) {
  const [title, setTitle] = useState<PetDescProps | null>(null);
  async function fetchDidYouKnow() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        onError();
        return;
      }
      const result: PetDescApiData = await res.json();
      setTitle(result.data);
    } catch (err) {
      onError();
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchDidYouKnow();
  }, []);
  if (!title) return <Loader />;
  return (
    <section className={styles.didYouKnow}>
      <h2>did you know?</h2>
      <p>{title.description}</p>
    </section>
  );
}

export default DidYouKnow;
