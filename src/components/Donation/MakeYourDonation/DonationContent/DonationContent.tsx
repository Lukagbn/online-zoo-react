import React, { useState } from "react";
import styles from "./DonationContent.module.scss";

const TITLE = [
  "Donation Information",
  "Billing Information",
  "Payment Information",
];
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
function DonationContent({ stepIndex }: { stepIndex: number }) {
  const [dropdown, setDropdown] = useState(false);
  const [btnIndex, setBtnIndex] = useState<number | null>(null);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  function stepper(index: number) {
    switch (index) {
      case 0:
        return (
          <div>
            {" "}
            <p className={styles.buttonLabel}>Choose your donation amount:</p>
            <div className={styles.btnWrapper}>
              {DONATION_PRICE.map((btn, index) => (
                <button
                  key={btn}
                  className={
                    btnIndex === index && donationAmount === Number(btn)
                      ? styles.Active
                      : ""
                  }
                  onClick={() => {
                    setBtnIndex(index);
                    setDonationAmount(Number(btn));
                  }}
                >
                  {btn}
                </button>
              ))}
              <div className={styles.formGroup}>
                <button
                  className={
                    donationAmount === null || donationAmount === 0
                      ? styles.Active
                      : ""
                  }
                  onClick={() => setDonationAmount(null)}
                >
                  other
                </button>
                <input
                  type="number"
                  value={donationAmount ?? 0}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                />
              </div>
              <button style={{ width: "100%" }}>for special pet</button>
              <div
                className={
                  dropdown
                    ? `${styles.dropDown} ${styles.dropDownActive}`
                    : styles.dropDown
                }
                onClick={() => setDropdown(!dropdown)}
              >
                <div className={styles.selectedContainer}>
                  <div className="selected" style={{ color: "black" }}>
                    Choose your favorite
                  </div>
                  <span>
                    <img src="/icons/arrowdown.svg" alt="drop down arrow" />
                  </span>
                </div>
                <ul className={styles.dropDownList}>
                  {DROPDOWN_PETS.map((list) => (
                    <li key={list}>{list}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input id="name" type="text" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email Address</label>
              <input id="email" type="text" />
            </div>
          </div>
        );
      default:
        return <div>{stepIndex}</div>;
    }
  }
  return (
    <>
      <div className={styles.popUpTitle}>
        <h3>{TITLE[stepIndex]}</h3>
        <hr />
      </div>
      {stepper(stepIndex)}
    </>
  );
}

export default DonationContent;
