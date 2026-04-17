"use client";
import React, { useState } from "react";
import styles from "./MakeYourDonation.module.scss";

function MakeYourDonation({ open }: { open: boolean }) {
  const DONATION_PRICE = ["10", "20", "30", "50", "80", "100"];
  const DROPDOWN_PETS = [
    "Lukas the Panda",
    "Andy the Lemur",
    "Glen the Gorilla",
    "Mike the Alligator",
    "Sam & Lora the eagles",
    "Liz the Koala",
    "Shake the Lion",
    "Senja the Tiger",
  ];
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className={styles.overlay}>
      {open ? (
        <dialog open>
          <h2>MakeYourDonation</h2>
          <p>donation information</p>
          <hr />
          <div className={styles.btnWrapper}>
            {DONATION_PRICE.map((btn) => (
              <button key={btn}>{btn}</button>
            ))}
            <div className={styles.formGroup}>
              <button>other</button>
              <input type="number" />
            </div>
            <button>for special pet</button>
            <div
              className={
                dropdown
                  ? `${styles.dropDown} ${styles.dropDownActive}`
                  : `${styles.dropDown}`
              }
              onClick={() => setDropdown(!dropdown)}
            >
              {/* <div className={styles.selectedContainer}>
                <div className="selected">Choose your favorite</div>
                <span>
                  <img src="/icons/arrowdown.svg" alt="drop down arrow" />
                </span>
              </div> */}
              <ul className={styles.dropDownList}>
                {DROPDOWN_PETS.map((list) => (
                  <li key={list}>{list}</li>
                ))}
              </ul>
            </div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}

export default MakeYourDonation;
