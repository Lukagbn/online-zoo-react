"use client";
import React, { useEffect, useState } from "react";
import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import styles from "./MakeYourDonation.module.scss";
import { getUserFromToken } from "@/utils/auth";

const PETS = [
  { id: 1, name: "Lukas the Panda" },
  { id: 2, name: "Andy the Lemur" },
  { id: 3, name: "Glen the Gorilla" },
  { id: 4, name: "Mike the Alligator" },
  { id: 5, name: "Sam & Lora the Eagles" },
  { id: 6, name: "Liz the Koala" },
  { id: 7, name: "Shake the Lion" },
  { id: 8, name: "Senja the Tiger" },
];

const AMOUNTS = [10, 20, 30, 50, 80, 100];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032];

interface CardData {
  creditNumber: string;
  cvv: string;
  month: string;
  year: string;
}

function MakeYourDonation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);

  // Step 1
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [selectedPet, setSelectedPet] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [petDropdownOpen, setPetDropdownOpen] = useState(false);
  const [step1Error, setStep1Error] = useState("");
  const [recurring, setRecurring] = useState(false);

  // Step 2
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 3
  const [card, setCard] = useState<CardData>({
    creditNumber: "",
    cvv: "",
    month: "",
    year: "",
  });
  const [cardErrors, setCardErrors] = useState({
    creditNumber: "",
    cvv: "",
    month: "",
    year: "",
  });
  const [rememberCard, setRememberCard] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const user = getUserFromToken();
      if (user) {
        setName(`${user.firstName} ${user.lastName}`);
        setEmail(user.email);
      }
      const savedCard = localStorage.getItem("savedCard");
      if (savedCard) {
        setCard(JSON.parse(savedCard));
        setRememberCard(true);
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const getAmount = () => {
    if (useCustom) return Number(customAmount);
    return selectedAmount ?? 0;
  };

  const step1Valid = () => getAmount() > 0 && selectedPet !== null;

  const validateStep2 = () => {
    let valid = true;
    if (!name.trim() || !/^[a-zA-Z\s]+$/.test(name.trim())) {
      setNameError("Name must contain only letters and spaces.");
      valid = false;
    } else setNameError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else setEmailError("");
    return valid;
  };

  const step2Valid = () =>
    name.trim().length > 0 &&
    /^[a-zA-Z\s]+$/.test(name.trim()) &&
    email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateStep3 = () => {
    let valid = true;
    const errors = { creditNumber: "", cvv: "", month: "", year: "" };
    if (card.creditNumber.length < 16) {
      errors.creditNumber = `Card number must be 16 digits (${card.creditNumber.length}/16).`;
      valid = false;
    }
    if (card.cvv.length < 3) {
      errors.cvv = `CVV must be 3 digits (${card.cvv.length}/3).`;
      valid = false;
    }
    if (!card.month) {
      errors.month = "Please select a month.";
      valid = false;
    }
    if (!card.year) {
      errors.year = "Please select a year.";
      valid = false;
    }
    setCardErrors(errors);
    return valid;
  };

  const step3Valid = () =>
    card.creditNumber.length === 16 &&
    card.cvv.length === 3 &&
    card.month !== "" &&
    card.year !== "";

  const handleNext = () => {
    if (step === 0 && step1Valid()) setStep(1);
    if (step === 1 && validateStep2()) setStep(2);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!validateStep3()) return;
    if (rememberCard) localStorage.setItem("savedCard", JSON.stringify(card));
    else localStorage.removeItem("savedCard");
    try {
      const res = await fetch(
        "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/donations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            amount: getAmount(),
            petId: selectedPet?.id,
          }),
        },
      );
      if (!res.ok) {
        setSubmitError("Error! Please try again.");
        return;
      }
      onClose();
      setStep(0);
      alert("Donation successful! Thank you for your support.");
    } catch {
      setSubmitError("Error! Please refresh and try again.");
    }
  };

  const TITLES = [
    "Donation Information",
    "Billing Information",
    "Payment Information",
  ];

  return (
    <>
      {open && (
        <div className={styles.overlay} onClick={onClose}>
          <dialog
            open
            className={styles.donatePopup}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupHeader}>
              <h2>make your donation</h2>
            </div>

            <div className={styles.popupTitle}>
              {TITLES.map((title, i) => (
                <h3 key={title} className={step === i ? styles.active : ""}>
                  {title}
                </h3>
              ))}
              <hr />
            </div>

            <div className={styles.stepContainer}>
              {/* STEP 1 */}
              {step === 0 && (
                <div className={styles.step}>
                  <p>Choose your donation amount:</p>
                  <div className={styles.btnWrapper}>
                    {AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={
                          !useCustom && selectedAmount === amount
                            ? styles.active
                            : ""
                        }
                        onClick={() => {
                          setSelectedAmount(amount);
                          setUseCustom(false);
                          setCustomAmount("");
                          setStep1Error("");
                        }}
                      >
                        ${amount}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={useCustom ? styles.active : ""}
                      onClick={() => {
                        setUseCustom(true);
                        setSelectedAmount(null);
                      }}
                    >
                      Other
                    </button>
                  </div>

                  {useCustom && (
                    <input
                      className={styles.customInput}
                      type="number"
                      value={customAmount}
                      placeholder="Enter amount"
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomAmount(val);
                        if (Number(val) <= 0)
                          setStep1Error(
                            "You must enter a value greater than 0",
                          );
                        else setStep1Error("");
                      }}
                    />
                  )}

                  <div className={styles.petDropdown}>
                    <button
                      type="button"
                      className={`${styles.special} ${selectedPet ? styles.active : ""}`}
                      onClick={() => setPetDropdownOpen(!petDropdownOpen)}
                    >
                      {selectedPet ? selectedPet.name : "for special pet"}
                    </button>
                    {petDropdownOpen && (
                      <ul className={styles.dropDownList}>
                        {PETS.map((pet) => (
                          <li
                            key={pet.id}
                            onClick={() => {
                              setSelectedPet(pet);
                              setPetDropdownOpen(false);
                            }}
                          >
                            {pet.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className={styles.checkbox}>
                    <label htmlFor="recurring">
                      Make this a monthly recurring gift
                    </label>
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={recurring}
                      onChange={() => setRecurring(!recurring)}
                    />
                  </div>
                  {step1Error && (
                    <span className={styles.stepError}>{step1Error}</span>
                  )}
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div className={styles.step}>
                  <div className={styles.formGroup}>
                    <label htmlFor="donationName">Your Name</label>
                    <input
                      type="text"
                      id="donationName"
                      placeholder="First and last name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (!/^[a-zA-Z\s]+$/.test(e.target.value.trim()))
                          setNameError(
                            "Name can only contain letters and spaces.",
                          );
                        else setNameError("");
                      }}
                    />
                    {nameError && (
                      <span className={styles.stepError}>{nameError}</span>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="donationEmail">Your Email Address</label>
                    <input
                      type="email"
                      id="donationEmail"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            e.target.value.trim(),
                          )
                        )
                          setEmailError("Please enter a valid email address.");
                        else setEmailError("");
                      }}
                    />
                    {emailError && (
                      <span className={styles.stepError}>{emailError}</span>
                    )}
                  </div>
                  <p className={styles.emailMessage}>
                    You will receive emails from the Online Zoo, including
                    updates and news. You can unsubscribe at any time.
                  </p>
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div className={styles.step}>
                  <div className={styles.formGroup}>
                    <label htmlFor="creditnumber">Credit Card Number</label>
                    <input
                      type="text"
                      id="creditnumber"
                      value={card.creditNumber}
                      maxLength={16}
                      onKeyDown={(e) => {
                        const allowed = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (allowed.includes(e.key)) return;
                        if (!/^\d$/.test(e.key)) e.preventDefault();
                        if (card.creditNumber.length >= 16) e.preventDefault();
                      }}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16);
                        setCard({ ...card, creditNumber: val });
                        if (val.length < 16)
                          setCardErrors((prev) => ({
                            ...prev,
                            creditNumber: `Card number must be 16 digits (${val.length}/16).`,
                          }));
                        else
                          setCardErrors((prev) => ({
                            ...prev,
                            creditNumber: "",
                          }));
                      }}
                    />
                    {cardErrors.creditNumber && (
                      <span className={styles.stepError}>
                        {cardErrors.creditNumber}
                      </span>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="cvv">CVV Number</label>
                    <input
                      type="text"
                      id="cvv"
                      value={card.cvv}
                      maxLength={3}
                      onKeyDown={(e) => {
                        const allowed = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (allowed.includes(e.key)) return;
                        if (!/^\d$/.test(e.key)) e.preventDefault();
                        if (card.cvv.length >= 3) e.preventDefault();
                      }}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 3);
                        setCard({ ...card, cvv: val });
                        if (val.length < 3)
                          setCardErrors((prev) => ({
                            ...prev,
                            cvv: `CVV must be 3 digits (${val.length}/3).`,
                          }));
                        else setCardErrors((prev) => ({ ...prev, cvv: "" }));
                      }}
                    />
                    {cardErrors.cvv && (
                      <span className={styles.stepError}>{cardErrors.cvv}</span>
                    )}
                  </div>
                  <div className={styles.dateContainer}>
                    <div className={styles.formGroup}>
                      <label>Expiration Month</label>
                      <div className={styles.dropDown}>
                        <button
                          type="button"
                          className={styles.selectedContainer}
                          onClick={() => {
                            setMonthDropdownOpen(!monthDropdownOpen);
                            setYearDropdownOpen(false);
                          }}
                        >
                          {card.month || "Month"}
                        </button>
                        {monthDropdownOpen && (
                          <ul className={styles.dropDownList}>
                            {MONTHS.map((month) => (
                              <li
                                key={month}
                                onClick={() => {
                                  setCard({ ...card, month });
                                  setMonthDropdownOpen(false);
                                  setCardErrors((prev) => ({
                                    ...prev,
                                    month: "",
                                  }));
                                }}
                              >
                                {month}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {cardErrors.month && (
                        <span className={styles.stepError}>
                          {cardErrors.month}
                        </span>
                      )}
                    </div>
                    <div className={styles.formGroup}>
                      <label>Year</label>
                      <div className={styles.dropDown}>
                        <button
                          type="button"
                          className={styles.selectedContainer}
                          onClick={() => {
                            setYearDropdownOpen(!yearDropdownOpen);
                            setMonthDropdownOpen(false);
                          }}
                        >
                          {card.year || "Year"}
                        </button>
                        {yearDropdownOpen && (
                          <ul className={styles.dropDownList}>
                            {YEARS.map((year) => (
                              <li
                                key={year}
                                onClick={() => {
                                  setCard({ ...card, year: String(year) });
                                  setYearDropdownOpen(false);
                                  setCardErrors((prev) => ({
                                    ...prev,
                                    year: "",
                                  }));
                                }}
                              >
                                {year}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {cardErrors.year && (
                        <span className={styles.stepError}>
                          {cardErrors.year}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.checkbox}>
                    <label htmlFor="rememberCard">Remember my card</label>
                    <input
                      type="checkbox"
                      id="rememberCard"
                      checked={rememberCard}
                      onChange={() => setRememberCard(!rememberCard)}
                    />
                  </div>
                  {submitError && (
                    <span className={styles.stepError}>{submitError}</span>
                  )}
                </div>
              )}
            </div>

            <div className={styles.popupNavigationContainer}>
              <div className={styles.stepperDots}>
                {TITLES.map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.dot} ${step >= i ? styles.active : ""}`}
                  />
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  className={styles.back}
                  onClick={handleBack}
                >
                  back
                </button>
              )}
              {step < 2 && (
                <button
                  type="button"
                  className={styles.next}
                  disabled={step === 0 ? !step1Valid() : !step2Valid()}
                  onClick={handleNext}
                >
                  next <RightArrow color="white" />
                </button>
              )}
              {step === 2 && (
                <button
                  type="button"
                  className={styles.complete}
                  disabled={!step3Valid()}
                  onClick={handleComplete}
                >
                  complete donation <RightArrow color="white" />
                </button>
              )}
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export default MakeYourDonation;
