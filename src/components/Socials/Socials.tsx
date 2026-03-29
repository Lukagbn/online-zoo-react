import Link from "next/link";
import React from "react";
import styles from "./Socials.module.scss";

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

interface IsNavbar {
  isNavbar?: boolean;
}

function Socials({ isNavbar }: IsNavbar) {
  return (
    <div
      className={isNavbar ? `${styles.navBar}` : `${styles.socialContainer}`}
    >
      {SOCIAL_LIST.map((item) => (
        <Link href={item.url} key={item.alt}>
          <img src={item.img} alt={item.alt} />
        </Link>
      ))}
    </div>
  );
}

export default Socials;
