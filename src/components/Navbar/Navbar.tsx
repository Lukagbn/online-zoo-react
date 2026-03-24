"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const NAVBAR_LIST = [
    { title: "about", url: "/" },
    { title: "map", url: "/map" },
    { title: "zoos", url: "#" },
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
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${layout.container}`}>
        <Link href={"#"} className={styles.logo}>
          <img src="/icons/Logo.svg" alt="zoo logo" />
        </Link>
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
  );
}

export default Navbar;
