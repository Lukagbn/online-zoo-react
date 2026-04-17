// "use client";
// import FetchError from "@/components/FetchError/FetchError";
// import Loader from "@/components/Loader/Loader";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import styles from "./page.module.scss";
// import TextBox from "@/components/AnimalBio/TextBox/TextBox";
// import layout from "@/app/layout.module.scss";
// import { getUserFromToken } from "@/utils/auth";

// interface PetProps {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   type: string;
//   size: string;
//   diet: string;
//   habitat: string;
//   range: string;
//   latitude: string;
//   longitude: string;
//   description: string;
//   detailedDescription: string;
// }

// interface PetApiResponse {
//   data: PetProps;
// }

// interface FormData {
//   email: string;
//   name: string;
//   cardNumber: string;
//   cvv: string;
//   date: string;
// }

// interface FormErrors {
//   email: string;
//   name: string;
//   cardNumber: string;
//   cvv: string;
//   date: string;
// }
// export interface FeedingTier {
//   type: "Basic" | "Standard" | "Premium";
//   label: string;
//   description: string;
//   price: number;
//   meals: string[];
// }
// export interface AnimalFeedingPlan {
//   id: string;
//   commonName: string;
//   tiers: FeedingTier[];
// }

// function page() {
//   const { id } = useParams();
//   const [pet, setPet] = useState<PetProps | null>(null);
//   const [donation, setDonation] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
//   const plan = ANIMAL_FEEDING_PLANS.find((p) => p.id === id);
//   const [error, setError] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const [form, setForm] = useState<FormData>({
//     email: "",
//     name: "",
//     cardNumber: "",
//     cvv: "",
//     date: "",
//   });

//   const [errors, setErrors] = useState<FormErrors>({
//     email: "",
//     name: "",
//     cardNumber: "",
//     cvv: "",
//     date: "",
//   });

//   useEffect(() => {
//     if (donation) {
//       const user = getUserFromToken();
//       if (user) {
//         setForm((prev) => ({
//           ...prev,
//           email: user.email || "",
//           name: `${user.firstName} ${user.lastName}` || "",
//         }));
//       }
//       const savedCard = localStorage.getItem("savedCard");
//       if (savedCard) {
//         const parsed = JSON.parse(savedCard);
//         setForm((prev) => ({
//           ...prev,
//           cardNumber: parsed.creditNumber || "",
//           cvv: parsed.cvv || "",
//           date:
//             parsed.month && parsed.year
//               ? `${parsed.year}-${String(MONTHS.indexOf(parsed.month) + 1).padStart(2, "0")}-01`
//               : "",
//         }));
//       }
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [donation]);

//   useEffect(() => {
//     async function fetchPet() {
//       try {
//         const res = await fetch(
//           `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
//         );
//         if (!res.ok) {
//           setError(true);
//           return;
//         }
//         const result: PetApiResponse = await res.json();
//         setPet(result.data);
//       } catch (err) {
//         setError(true);
//         console.error("error", err);
//       }
//     }
//     fetchPet();
//   }, []);

//   const MONTHS = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const validate = (): boolean => {
//     const newErrors: FormErrors = {
//       email: "",
//       name: "",
//       cardNumber: "",
//       cvv: "",
//       date: "",
//     };
//     let valid = true;

//     if (
//       !form.email.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
//     ) {
//       newErrors.email = "Please enter a valid email address.";
//       valid = false;
//     }
//     if (!form.name.trim() || !/^[a-zA-Z\s]{2,}$/.test(form.name.trim())) {
//       newErrors.name = "Name must contain at least 2 letters.";
//       valid = false;
//     }
//     if (!form.cardNumber || form.cardNumber.replace(/\D/g, "").length < 16) {
//       newErrors.cardNumber = `Card number must be 16 digits (${form.cardNumber.replace(/\D/g, "").length}/16).`;
//       valid = false;
//     }
//     if (!form.cvv || form.cvv.length < 3) {
//       newErrors.cvv = `CVV must be 3 digits (${form.cvv.length}/3).`;
//       valid = false;
//     }
//     if (!form.date) {
//       newErrors.date = "Please select an expiry date.";
//       valid = false;
//     } else {
//       const selected = new Date(form.date);
//       const now = new Date();
//       if (selected < now) {
//         newErrors.date = "Expiry date must be in the future.";
//         valid = false;
//       }
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setForm((prev) => ({ ...prev, [id]: value }));
//     setErrors((prev) => ({ ...prev, [id]: "" }));
//   };

//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\D/g, "").slice(0, 16);
//     setForm((prev) => ({ ...prev, cardNumber: val }));
//     if (val.length < 16) {
//       setErrors((prev) => ({
//         ...prev,
//         cardNumber: `Card number must be 16 digits (${val.length}/16).`,
//       }));
//     } else {
//       setErrors((prev) => ({ ...prev, cardNumber: "" }));
//     }
//   };

//   const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\D/g, "").slice(0, 3);
//     setForm((prev) => ({ ...prev, cvv: val }));
//     if (val.length < 3) {
//       setErrors((prev) => ({
//         ...prev,
//         cvv: `CVV must be 3 digits (${val.length}/3).`,
//       }));
//     } else {
//       setErrors((prev) => ({ ...prev, cvv: "" }));
//     }
//   };

//   const isFormValid = () => {
//     return (
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
//       /^[a-zA-Z\s]{2,}$/.test(form.name.trim()) &&
//       form.cardNumber.replace(/\D/g, "").length === 16 &&
//       form.cvv.length === 3 &&
//       form.date !== "" &&
//       new Date(form.date) > new Date()
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSubmitError("");

//     try {
//       const res = await fetch(
//         "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/donations",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: form.name,
//             email: form.email,
//             amount: selectedPrice ?? 0,
//             petId: Number(id),
//           }),
//         },
//       );
//       if (!res.ok) {
//         setSubmitError("Something went wrong. Please try again.");
//         return;
//       }
//       setSubmitSuccess(true);
//       setDonation(false);
//       alert("Donation successful! Thank you for your support.");
//     } catch {
//       setSubmitError("Network error. Please try again.");
//     }
//   };

//   if (error) return <FetchError />;
//   if (!pet) return <Loader />;

//   return (
//     <section className={styles.feedSection}>
//       <h2>Feed {pet?.commonName}</h2>
//       <TextBox
//         commonName={pet.commonName}
//         diet={pet.diet}
//         habitat={pet.habitat}
//         id={pet.id}
//         latitude={pet.latitude}
//         longitude={pet.longitude}
//         range={pet.range}
//         scientificName={pet.scientificName}
//         size={pet.size}
//         type={pet.type}
//       />
//       <h3 className={styles.feedingPlansHeader}>Feeding Plans</h3>
//       <div className={`${styles.feedingPlans} ${layout.container}`}>
//         {plan?.tiers.map((tier) => (
//           <div
//             className={`${styles.planCard} ${styles[tier.type.toLowerCase()]}`}
//             key={tier.label}
//           >
//             <h3>{tier.type}</h3>
//             <p>{tier.label}</p>
//             <div className={styles.meals}>
//               {tier.meals.map((meal, index) => (
//                 <p key={index}>{meal}</p>
//               ))}
//             </div>
//             <button
//               onClick={() => {
//                 setSelectedPrice(tier.price);
//                 setDonation(true);
//               }}
//             >
//               ${tier.price}
//             </button>
//           </div>
//         ))}
//       </div>

//       {donation && (
//         <div className={styles.overlay} onClick={() => setDonation(false)}>
//           <dialog
//             className={styles.feedDonation}
//             open
//             onClick={(e) => e.stopPropagation()}
//           >
//             <form className={styles.form} onSubmit={handleSubmit}>
//               <h2>Fill Up Donation</h2>
//               <span className={styles.cross} onClick={() => setDonation(false)}>
//                 X
//               </span>

//               {selectedPrice && (
//                 <p className={styles.donationPlan}>
//                   Donation amount: <strong>${selectedPrice}</strong>
//                 </p>
//               )}

//               <div className={styles.formGroup}>
//                 <label htmlFor="email">email</label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="email"
//                   value={form.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && (
//                   <span className={styles.fieldError}>{errors.email}</span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="name">name</label>
//                 <input
//                   id="name"
//                   type="text"
//                   placeholder="name"
//                   value={form.name}
//                   onChange={handleChange}
//                 />
//                 {errors.name && (
//                   <span className={styles.fieldError}>{errors.name}</span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="cardNumber">card number</label>
//                 <input
//                   id="cardNumber"
//                   type="text"
//                   placeholder="card number"
//                   value={form.cardNumber}
//                   maxLength={16}
//                   onKeyDown={(e) => {
//                     const allowed = [
//                       "Backspace",
//                       "Delete",
//                       "ArrowLeft",
//                       "ArrowRight",
//                       "Tab",
//                     ];
//                     if (allowed.includes(e.key)) return;
//                     if (!/^\d$/.test(e.key)) e.preventDefault();
//                   }}
//                   onChange={handleCardNumberChange}
//                 />
//                 {errors.cardNumber && (
//                   <span className={styles.fieldError}>{errors.cardNumber}</span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="cvv">cvv</label>
//                 <input
//                   id="cvv"
//                   type="text"
//                   placeholder="cvv"
//                   value={form.cvv}
//                   maxLength={3}
//                   onKeyDown={(e) => {
//                     const allowed = [
//                       "Backspace",
//                       "Delete",
//                       "ArrowLeft",
//                       "ArrowRight",
//                       "Tab",
//                     ];
//                     if (allowed.includes(e.key)) return;
//                     if (!/^\d$/.test(e.key)) e.preventDefault();
//                   }}
//                   onChange={handleCvvChange}
//                 />
//                 {errors.cvv && (
//                   <span className={styles.fieldError}>{errors.cvv}</span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="date">expiry date</label>
//                 <input
//                   id="date"
//                   type="month"
//                   value={form.date}
//                   onChange={handleChange}
//                 />
//                 {errors.date && (
//                   <span className={styles.fieldError}>{errors.date}</span>
//                 )}
//               </div>

//               {submitError && (
//                 <p className={styles.submitError}>{submitError}</p>
//               )}

//               <button
//                 className={styles.submitDonation}
//                 type="submit"
//                 disabled={!isFormValid()}
//               >
//                 submit donation
//               </button>
//             </form>
//           </dialog>
//         </div>
//       )}
//     </section>
//   );
// }

// export default page;
