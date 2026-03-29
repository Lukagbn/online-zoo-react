"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { getUserFromToken } from "@/utils/auth";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Include at least 1 special character"),
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
  const [loginError, setLoginError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogIn = async (data: { email: string; password: string }) => {
    try {
      const res = await fetch(
        "https://online-zoo-backend.onrender.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        },
      );
      const result = await res.json();
      if (!res.ok) {
        setLoginError("Incorrect login or password");
        return;
      }
      const storage = checked ? localStorage : sessionStorage;
      storage.setItem("token", result.token);
      router.push("/");
    } catch (error) {
      setLoginError("Something went wrong. Try again.");
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
    <form className={styles.form} onSubmit={handleSubmit(handleLogIn)}>
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
      <div className={`${styles.formGroup} ${styles.checkbox}`}>
        <input
          id="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="checkbox">Remember Me</label>
      </div>
      <button type="submit" disabled={!isValid} className={styles.signinBtn}>
        sign in
      </button>
      <p className={styles.redirect}>
        Don't have an account? <Link href="/register">Register Now</Link>
      </p>
      {loginError && <p className={styles.formSubmitError}>{loginError}</p>}
    </form>
  );
}

export default page;
