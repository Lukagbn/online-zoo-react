"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "../login/page.module.scss";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "Must be at least 3 characters")
    .matches(/^[a-zA-Z]{3,}$/, "English letters only"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Must be at least 3 characters")
    .matches(/^[a-zA-Z]{3,}$/, "English letters only"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Include at least 1 special character"),
  repassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
  }) => {
    try {
      const res = await fetch(
        "https://online-zoo-backend.onrender.com/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
          }),
        },
      );
      if (!res.ok) {
        const result = await res.json();
        setSubmitError(result.error || "Something went wrong.");
        return;
      }
      router.push("/login");
    } catch (error) {
      setSubmitError("Something went wrong. Try again.");
    }
  };
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);
  return (
    <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">first name</label>
        <input type="text" id="firstName" {...register("firstName")} />
        {errors.firstName && (
          <span className={styles.error}>{errors.firstName.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">last name</label>
        <input type="text" id="lastName" {...register("lastName")} />
        {errors.lastName && (
          <span className={styles.error}>{errors.lastName.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "hide" : "show"}
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="repassword">confirm password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={rePasswordVisible ? "text" : "password"}
            id="repassword"
            {...register("repassword")}
          />
          <button
            type="button"
            onClick={() => setRePasswordVisible(!rePasswordVisible)}
          >
            {rePasswordVisible ? "hide" : "show"}
          </button>
        </div>
        {errors.repassword && (
          <span className={styles.error}>{errors.repassword.message}</span>
        )}
      </div>
      <button type="submit" disabled={!isValid} className={styles.signinBtn}>
        sign up
      </button>
      <p className={styles.redirect}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
      {submitError && <p className={styles.formSubmitError}>{submitError}</p>}
    </form>
  );
}

export default page;
