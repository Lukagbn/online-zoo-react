import React, { useEffect, useState } from "react";
import styles from "./DidYouKnow.module.scss";
import FetchError from "@/components/FetchError/FetchError";
import Loader from "@/components/Loader/Loader";

interface PetDescApiData {
  data: PetDescProps;
}
interface PetDescProps {
  description: string;
}

function DidYouKnow({ id }: { id: string }) {
  const [title, setTitle] = useState<PetDescProps | null>(null);
  const [error, setError] = useState(false);
  async function fetchDidYouKnow() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      if (!res.ok) {
        setError(true);
        return;
      }
      const result: PetDescApiData = await res.json();
      setTitle(result.data);
    } catch (err) {
      setError(true);
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchDidYouKnow();
  }, []);
  if (error) return <FetchError />;
  if (!title) return <Loader />;
  return (
    <section className={styles.didYouKnow}>
      <h2>did you know?</h2>
      <p>{title.description}</p>
    </section>
  );
}

export default DidYouKnow;
