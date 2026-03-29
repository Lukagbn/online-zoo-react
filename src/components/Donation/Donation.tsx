"use client";
import React, { useEffect, useState } from "react";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import styles from "./Donation.module.scss";

function Donation() {
  const [donation, setDonation] = useState(false);
  useEffect(() => {
    if (donation) {
      document.documentElement.classList.add("noScroll");
      document.body.classList.add("noScroll");
    } else {
      document.documentElement.classList.remove("noScroll");
      document.body.classList.remove("noScroll");
    }
  }, [donation]);
  return (
    <>
      <button
        type="button"
        className={styles.donateVolunteers}
        onClick={() => setDonation(!donation)}
      >
        Donate for volunteers
        <RightArrow color="white" />
      </button>
      {donation && (
        <div className={styles.overlay} onClick={() => setDonation(!donation)}>
          <dialog
            open
            className={styles.together}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.imgContainer}>
              <img src="/images/careandprotect.png" alt="care and protect" />
              <span
                className={styles.cross}
                onClick={() => setDonation(!donation)}
              >
                X
              </span>
            </div>
            <div className={styles.textContainer}>
              <h2>together we care, save and protect!</h2>
              <p>
                Your most generous gift not only cares for countless animals,
                but it also offers hope and a vital lifeline to the world’s most
                endangered wildlife relying on us to survive.
              </p>
            </div>
            <div className={styles.btnContainer}>
              <button>$20</button>
              <button>$30</button>
              <button>$50</button>
              <button>$80</button>
              <button>$100</button>
              <button>other</button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export default Donation;
