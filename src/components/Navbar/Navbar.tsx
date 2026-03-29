"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import { getUserFromToken } from "@/utils/auth";
import Logo from "../Logo/Logo";

function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [popUp, setpopUp] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
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
  function LogOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
  }, [pathname]);
  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.container} ${layout.container}`}>
          <Link href={"#"} className={styles.logo}>
            <Logo color="black" />
          </Link>
          <div className={styles.userContainer}>
            <img
              className={styles.user}
              src="/icons/usericon.svg"
              alt="user"
              onClick={() => setpopUp(!popUp)}
            />
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
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
                <h3>Hello {user.firstName + user.lastName}</h3>
                <h4>Your email is: {user.email}</h4>
                <button className={styles.logOutBtn} onClick={() => LogOut()}>
                  Log out
                </button>
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
