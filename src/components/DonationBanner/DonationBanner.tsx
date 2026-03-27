import React from "react";
import styles from "./DonationBanner.module.scss";
import layout from "@/app/layout.module.scss";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";

interface DonationProps {
  title: string;
  paragraph: string;
}

function DonationBanner({ title, paragraph }: DonationProps) {
  return (
    <section className={styles.donations}>
      <div className={`${styles.donationContainer} ${layout.container}`}>
        <div className={styles.donationsTextContent}>
          <div className={styles.donationInfo}>
            <h2>{title}</h2>
            <p>{paragraph}</p>
          </div>
          <div className={styles.donationAction}>
            <h3>Quick Donate</h3>
            <button type="button">
              $ donation amount
              <div className={styles.arrowBtnBackground}>
                <RightArrow color="white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationBanner;
