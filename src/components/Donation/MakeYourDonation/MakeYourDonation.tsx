"use client";
import React, { useState } from "react";
import styles from "./MakeYourDonation.module.scss";
import DonationContent from "./DonationContent/DonationContent";

function MakeYourDonation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | 0>(0);

  function handleNext() {
    if (activeIndex >= 2) return;
    setActiveIndex(activeIndex + 1);
  }
  function handleBack() {
    if (activeIndex <= 0) return;
    setActiveIndex(activeIndex - 1);
  }
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <dialog
        open={open}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.popupHeader}>
          <h2>Make Your Donation</h2>
        </div>
        <DonationContent stepIndex={activeIndex} />
        <div className={styles.modalFooter}>
          <div className={styles.dotsWrapper}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`${styles.dot} ${activeIndex >= i ? styles.dotActive : ""}`}
              />
            ))}
          </div>
          {activeIndex > 0 ? (
            <button
              className={styles.back}
              onClick={() => {
                handleBack();
              }}
            >
              back
            </button>
          ) : null}
          <button
            className={styles.next}
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default MakeYourDonation;
