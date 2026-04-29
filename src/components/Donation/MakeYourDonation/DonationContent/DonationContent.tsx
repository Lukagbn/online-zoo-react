"use client";
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

interface DonationContentProps {
  stepIndex: number;
  donationAmount: number | null;
  setDonationAmount: (val: number | null) => void;
  pet: string | null;
  setPet: (val: string | null) => void;
  btnIndex: number | null;
  setBtnIndex: (val: number | null) => void;
  nameInput: string | null;
  setNameInput: (val: string | null) => void;
  emailInput: string | null;
  setEmailInput: (val: string | null) => void;
  nameError: string;
  setNameError: (val: string) => void;
  emailError: string;
  setEmailError: (val: string) => void;
  card: { creditNumber: string; cvv: string; month: string; year: string };
  setCard: (val: {
    creditNumber: string;
    cvv: string;
    month: string;
    year: string;
  }) => void;
  cardErrors: {
    creditNumber: string;
    cvv: string;
    month: string;
    year: string;
  };
  setCardErrors: (val: {
    creditNumber: string;
    cvv: string;
    month: string;
    year: string;
  }) => void;
  rememberCard: boolean;
  setRememberCard: (val: boolean) => void;
  submitError: string;
  isValidAmount: (val: number) => boolean;
  isValidName: (val: string) => boolean;
  isValidEmail: (val: string) => boolean;
}

function DonationContent({
  stepIndex,
  donationAmount,
  setDonationAmount,
  pet,
  setPet,
  btnIndex,
  setBtnIndex,
  nameInput,
  setNameInput,
  emailInput,
  setEmailInput,
  nameError,
  setNameError,
  emailError,
  setEmailError,
  card,
  setCard,
  cardErrors,
  setCardErrors,
  rememberCard,
  setRememberCard,
  submitError,
  isValidAmount,
  isValidEmail,
  isValidName,
}: DonationContentProps) {
  const [dropdown, setDropdown] = useState(false);

  function stepper(index: number) {
    switch (index) {
      case 0:
        return (
          <div>
            <p className={styles.buttonLabel}>Choose your donation amount:</p>
            <div className={styles.btnWrapper}>
              {DONATION_PRICE.map((btn, i) => (
                <button
                  key={btn}
                  className={
                    btnIndex === i && donationAmount === Number(btn)
                      ? styles.Active
                      : ""
                  }
                  onClick={() => {
                    setBtnIndex(i);
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
                    <p>{pet ?? "Choose your favorite"}</p>
                  </div>
                  <span>
                    <img src="/icons/arrowdown.svg" alt="drop down arrow" />
                  </span>
                </div>
                <ul className={styles.dropDownList}>
                  {DROPDOWN_PETS.map((list) => (
                    <li key={list} onClick={() => setPet(list)}>
                      {list}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.checkBox}>
              <label htmlFor="monthly">
                Make this a monthly recurring gift
              </label>
              <input id="monthly" type="checkbox" />
            </div>
          </div>
        );

      case 1:
        return (
          <div className={styles.step}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="First and last name"
                value={nameInput ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setNameInput(val);
                  setNameError(
                    isValidName(val)
                      ? ""
                      : "Name can only contain letters and spaces.",
                  );
                }}
              />
              {nameError && <span className={styles.error}>{nameError}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email Address</label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={emailInput ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmailInput(val);
                  setEmailError(
                    isValidEmail(val)
                      ? ""
                      : "Please enter a valid email address.",
                  );
                }}
              />
              {emailError && <span className={styles.error}>{emailError}</span>}
            </div>
            <p className={styles.receiveEmail}>
              You will receive emails from the Online Zoo, including updates and
              news. You can unsubscribe at any time.
            </p>
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.formGroup}>
              <label htmlFor="credit">Credit Card Number</label>
              <input
                id="credit"
                type="text"
                maxLength={16}
                value={card.creditNumber}
                onChange={(e) => {
                  setCard({
                    ...card,
                    creditNumber: e.target.value.replace(/\D/g, ""),
                  });
                  setCardErrors({ ...cardErrors, creditNumber: "" });
                }}
              />
              {cardErrors.creditNumber && (
                <span className={styles.error}>{cardErrors.creditNumber}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV Number</label>
              <input
                id="cvv"
                type="text"
                maxLength={3}
                value={card.cvv}
                onChange={(e) => {
                  setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") });
                  setCardErrors({ ...cardErrors, cvv: "" });
                }}
              />
              {cardErrors.cvv && (
                <span className={styles.error}>{cardErrors.cvv}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="month">Expiry Month</label>
              <select
                id="month"
                value={card.month}
                onChange={(e) => {
                  setCard({ ...card, month: e.target.value });
                  setCardErrors({ ...cardErrors, month: "" });
                }}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) =>
                  String(i + 1).padStart(2, "0"),
                ).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {cardErrors.month && (
                <span className={styles.error}>{cardErrors.month}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="year">Expiry Year</label>
              <select
                id="year"
                value={card.year}
                onChange={(e) => {
                  setCard({ ...card, year: e.target.value });
                  setCardErrors({ ...cardErrors, year: "" });
                }}
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) =>
                  String(new Date().getFullYear() + i),
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              {cardErrors.year && (
                <span className={styles.error}>{cardErrors.year}</span>
              )}
            </div>
            {submitError && <span className={styles.error}>{submitError}</span>}
            <div className={styles.checkBox}>
              <label htmlFor="rememberCard">Remember my card</label>
              <input
                id="rememberCard"
                type="checkbox"
                checked={rememberCard}
                onChange={(e) => setRememberCard(e.target.checked)}
              />
            </div>
          </div>
        );
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
