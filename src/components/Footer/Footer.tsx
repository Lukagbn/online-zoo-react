import styles from "./Footer.module.scss";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import Donation from "../Donation/Donation";

function Footer() {
  const FOOTER_LIST = [
    { title: "about", href: "/" },
    { title: "map", href: "/map" },
    { title: "zoos", href: "/zoos/1" },
    { title: "contact us", href: "/contact" },
  ];
  const FOOTER_BRANDS = [
    { href: "#", img: "/icons/logo.svg", alt: "online zoo" },
    { href: "#", img: "/icons/yemdigital.svg", alt: "yem digital" },
    {
      href: "https://rs.school/courses/short-track",
      img: "/icons/rsschoollogo.svg",
      alt: "rs school",
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
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} ${layout.container}`}>
        <div className={styles.footerHeader}>
          <div className={styles.footerImgContainer}>
            {FOOTER_BRANDS.map((item) => (
              <Link href={item.href} target="_blank" key={item.alt}>
                <img src={item.img} alt={item.alt} />
              </Link>
            ))}
          </div>
          <nav className={styles.footerNavigation}>
            <ul>
              {FOOTER_LIST.map((item) => (
                <li key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <Donation />
        </div>
        <hr className={styles.topLine} />
        <div className={styles.footerBody}>
          <div className={styles.socialContainer}>
            {SOCIAL_LIST.map((item) => (
              <Link href={item.url} key={item.alt}>
                <img src={item.img} alt={item.alt} />
              </Link>
            ))}
          </div>
          <hr className={styles.bottomLine} />
          <ul className={styles.rights}>
            <li>© 2021 DinaK</li>
            <li>© Yem Digital</li>
            <li>© RSSchool</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
