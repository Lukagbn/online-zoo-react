import styles from "./Footer.module.scss";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
import Donation from "../Donation/Donation";
import Logo from "../Logo";
import Socials from "../Socials/Socials";
import Image from "next/image";

function Footer() {
  const FOOTER_LIST = [
    { title: "about", href: "/" },
    { title: "map", href: "/map" },
    { title: "zoos", href: "/zoos/1" },
    { title: "contact us", href: "/contact" },
  ];
  const FOOTER_BRANDS = [
    {
      href: "#",
      img: "/icons/yemdigital.svg",
      alt: "yem digital",
      width: 50,
      height: 50,
    },
    {
      href: "https://rs.school/courses/short-track",
      img: "/icons/rsschoollogo.svg",
      alt: "rs school",
      width: 138,
      height: 51,
    },
  ];
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} ${layout.container}`}>
        <div className={styles.footerHeader}>
          <div className={styles.footerImgContainer}>
            <Logo color="white" />
            {FOOTER_BRANDS.map((item) => (
              <Link href={item.href} target="_blank" key={item.alt}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
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
          <Socials />
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
