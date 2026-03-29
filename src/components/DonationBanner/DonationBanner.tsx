"use client";
import React, { useEffect, useState } from "react";
import styles from "./DonationBanner.module.scss";
import layout from "@/app/layout.module.scss";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import MakeYourDonation from "../Donation/MakeYourDonation/MakeYourDonation";

interface DonationProps {
  title: string;
  paragraph: string;
  className?: string;
}

function DonationBanner({ title, paragraph, className }: DonationProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <section className={`${styles.donations} ${className || ""}`}>
      <div className={`${styles.donationContainer} ${layout.container}`}>
        <div className={styles.donationsTextContent}>
          <div className={styles.donationInfo}>
            <h2>{title}</h2>
            <p>{paragraph}</p>
          </div>
          <div className={styles.donationAction}>
            <h3>Quick Donate</h3>
            <button type="button" onClick={() => setPressed(!pressed)}>
              $ donation amount
              <div className={styles.arrowBtnBackground}>
                <RightArrow color="white" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <MakeYourDonation open={pressed} onClose={() => setPressed(false)} />
    </section>
  );
}

export default DonationBanner;
