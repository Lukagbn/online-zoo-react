"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";

function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [popUp, setpopUp] = useState(false);
  const [user, setUser] = useState(false);
  const [hoverLogIn, setHoverLogIn] = useState(false);
  const [hoverSignUp, sethoverSignUp] = useState(false);
  const NAVBAR_LIST = [
    { title: "about", url: "/" },
    { title: "map", url: "/map" },
    { title: "zoos", url: "/zoos/1" },
    { title: "contact us", url: "/contact" },
    {
      title: "design",
      url: "https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project?node-id=0-1&t=Qtw6UTUpqk6Naxni-1",
    },
  ];
  const SOCIAL_LIST = [
    {
      img: "/icons/youtube.svg",
      url: "https://www.youtube.com/",
      alt: "Youtube",
    },
    {
      img: "/icons/instagram.svg",
      url: "https://www.instagram.com/",
      alt: "Instagram",
    },
    {
      img: "/icons/facebook.svg",
      url: "https://www.facebook.com/",
      alt: "Facebook",
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [user]);
  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.container} ${layout.container}`}>
          <Link href={"#"} className={styles.logo}>
            <img src="/icons/Logo.svg" alt="zoo logo" />
          </Link>
          <img
            className={styles.user}
            src="/icons/usericon.svg"
            alt="user"
            onClick={() => setpopUp(!popUp)}
          />
          <nav className={styles.nav}>
            <ul
              className={`${styles.navList} ${active ? styles.navListActive : ""}`}
            >
              {NAVBAR_LIST.map((item) => (
                <li
                  key={item.title}
                  className={`${pathname === item.url ? styles.active : null}`}
                >
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.socialContainer}>
              {SOCIAL_LIST.map((item) => (
                <Link href={item.url} key={item.alt}>
                  <img src={item.img} alt={item.alt} />
                </Link>
              ))}
            </div>
          </nav>
          <div
            className={`${styles.burger} ${active ? styles.burgerActive : ""}`}
            onClick={() => setActive(!active)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className={styles.visuallyHidden}>online-zoo</h1>
        </div>
      </header>
      {popUp && (
        <div className={styles.overlay} onClick={() => setpopUp(!popUp)}>
          <dialog
            open
            className={styles.authDialogContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.closeModal}
              onClick={() => setpopUp(!popUp)}
            >
              X
            </span>
            {user ? (
              <div
                className={`${styles.loggedInUser} ${styles.loggedInUserActive}`}
              >
                <h3>Hello</h3>
                <h4>Your email is:</h4>
                <button className={styles.logOutBtn}>Log out</button>
              </div>
            ) : (
              <div className={styles.loggedOutUser}>
                <h3>Login Or Register</h3>
                <div className={styles.authLinks}>
                  <Link
                    href="/login"
                    onMouseEnter={() => setHoverLogIn(true)}
                    onMouseLeave={() => setHoverLogIn(false)}
                  >
                    Log in
                    <RightArrow color={hoverLogIn ? "white" : "#20113d"} />
                  </Link>
                  <Link
                    href="/register"
                    onMouseEnter={() => sethoverSignUp(true)}
                    onMouseLeave={() => sethoverSignUp(false)}
                  >
                    Sign up
                    <RightArrow color={hoverSignUp ? "white" : "#20113d"} />
                  </Link>
                </div>
              </div>
            )}
          </dialog>
        </div>
      )}
    </>
  );
}

export default Navbar;
