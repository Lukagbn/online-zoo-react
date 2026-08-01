import Link from "next/link";
import styles from "./Socials.module.scss";
import Image from "next/image";

const SOCIAL_LIST = [
  {
    img: "/icons/social/youtube.svg",
    url: "https://www.youtube.com/",
    alt: "Youtube",
  },
  {
    img: "/icons/social/instagram.svg",
    url: "https://www.instagram.com/",
    alt: "Instagram",
  },
  {
    img: "/icons/social/facebook.svg",
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
          <Image src={item.img} alt={item.alt} width={40} height={40} />
        </Link>
      ))}
    </div>
  );
}

export default Socials;
