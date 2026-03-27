"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PetApiData {
  data: PetProps;
}
interface PetProps {
  commonName: string;
  description: string;
  detailedDescription: string;
  diet: string;
  habitat: string;
  id: number;
  latitude: string;
  longitude: string;
  range: string;
  scientificName: string;
  size: string;
  type: string;
}

function page() {
  const { id } = useParams();
  const [petData, setPetData] = useState<PetProps | null>(null);
  const [error, setError] = useState(false);
  async function fetchPet() {
    try {
      const res = await fetch(
        `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
      );
      const result: PetApiData = await res.json();
      setPetData(result.data);
    } catch (err) {
      console.log("err:", err);
    }
  }
  useEffect(() => {
    fetchPet();
  }, []);
  return <div>{petData?.commonName}</div>;
}

export default page;
