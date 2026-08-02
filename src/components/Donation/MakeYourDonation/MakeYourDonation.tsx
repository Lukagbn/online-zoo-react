"use client";
import { useEffect, useState } from "react";
import styles from "./MakeYourDonation.module.scss";
import DonationContent from "./DonationContent/DonationContent";
import { getUserFromToken } from "@/utils/auth";

const isValidAmount = (val: number) => val >= 1;

const isValidName = (val: string) =>
  val.trim().length > 0 && /^[a-zA-Z\s]+$/.test(val.trim());

const isValidEmail = (val: string) =>
  val.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

function MakeYourDonation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [pet, setPet] = useState<string | null>(null);
  const [btnIndex, setBtnIndex] = useState<number | null>(null);

  const [nameInput, setNameInput] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string | null>(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [card, setCard] = useState({
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
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const userData = getUserFromToken();
    if (userData) {
      setNameInput(`${userData.firstName} ${userData.lastName}`);
      setEmailInput(userData.email);
    }
  }, []);

  const getAmount = () => donationAmount ?? 0;
  const step1Valid = () => getAmount() > 0 && pet !== null;

  const step2Valid = () => {
    const name = nameInput ?? "";
    const email = emailInput ?? "";
    return (
      name.trim().length > 0 &&
      /^[a-zA-Z\s]+$/.test(name.trim()) &&
      email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    );
  };

  const validateStep2 = () => {
    let valid = true;
    if (!isValidName(nameInput ?? "")) {
      setNameError("Name must contain only letters and spaces.");
      valid = false;
    } else setNameError("");
    if (!isValidEmail(emailInput ?? "")) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else setEmailError("");
    return valid;
  };

  const step3Valid = () =>
    card.creditNumber.length === 16 &&
    card.cvv.length === 3 &&
    card.month !== "" &&
    card.year !== "";

  const isNextDisabled = () => {
    if (activeIndex === 0) return !step1Valid();
    if (activeIndex === 1) return !step2Valid();
    if (activeIndex === 2) return !step3Valid();
    return false;
  };

  const handleNext = () => {
    if (activeIndex === 0 && step1Valid()) setActiveIndex(1);
    if (activeIndex === 1 && validateStep2()) setActiveIndex(2);
  };

  const handleBack = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      style={{ display: open ? "flex" : "none" }}
    >
      <dialog
        open={open}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.popupHeader}>
          <h2>Make Your Donation</h2>
        </div>
        <DonationContent
          stepIndex={activeIndex}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          pet={pet}
          setPet={setPet}
          btnIndex={btnIndex}
          setBtnIndex={setBtnIndex}
          nameInput={nameInput}
          setNameInput={setNameInput}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          nameError={nameError}
          setNameError={setNameError}
          emailError={emailError}
          setEmailError={setEmailError}
          card={card}
          setCard={setCard}
          cardErrors={cardErrors}
          setCardErrors={setCardErrors}
          rememberCard={rememberCard}
          setRememberCard={setRememberCard}
          submitError={submitError}
          isValidAmount={isValidAmount}
          isValidName={isValidName}
          isValidEmail={isValidEmail}
        />
        <div className={styles.modalFooter}>
          <div className={styles.dotsWrapper}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`${styles.dot} ${activeIndex >= i ? styles.dotActive : ""}`}
              />
            ))}
          </div>
          {activeIndex > 0 && (
            <button className={styles.back} onClick={handleBack}>
              back
            </button>
          )}
          <button
            className={styles.next}
            onClick={() => {
              activeIndex === 2 ? onClose() : handleNext();
            }}
            disabled={isNextDisabled()}
          >
            {activeIndex === 2 ? "Complete" : "Next"}
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default MakeYourDonation;
