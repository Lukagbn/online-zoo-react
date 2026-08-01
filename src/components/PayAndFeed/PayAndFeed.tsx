import styles from "./PayAndFeed.module.scss";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import PayAndFeedHr from "./PayAndFeedHr/PayAndFeedHr";
import Image from "next/image";

interface PayAndFeedProps {
  heroImg: string;
  heroImgAlt: string;
  heroIcon: string;
  heroIconAlt: string;
  heroIconWidth: number;
  heroIconHeight: number;
  title: string;
  paragraph: string;
  button?: boolean;
}

function PayAndFeed() {
  const PAYANDFEED: PayAndFeedProps[] = [
    {
      heroImg: "/images/monkey.webp",
      heroImgAlt: "mokey",
      heroIcon: "/icons/heart.svg",
      heroIconAlt: "heart",
      title: "Your donation has an impact",
      heroIconWidth: 106,
      heroIconHeight: 80,
      paragraph: ` Providing our animals with high-quality nutritious diets is just
                one element of animal care at our Zoo. We do all the best so
                that our animals can eat food similar to what they might find in
                their natural habitats while making sure they get the right mix
                of nutrients, proteins, and vitamins to be happy and healthy.
                Please help us provide nutritious food for our animals by
                donating. The generosity of people like you can help us make
                sure that our animals enjoy good food that keeps them in great
                condition.`,
    },
    {
      heroImg: "/images/banana.webp",
      heroImgAlt: "banana",
      heroIcon: "/icons/donation.svg",
      heroIconAlt: "donation",
      title: "Make a donation",
      heroIconWidth: 100,
      heroIconHeight: 80,
      paragraph: `      You can donate through your credit card without any fees. It is
                easy and safe. We do not keep donors' personal information on an
                online network. Choose an amount to give and the pet's name if
                needed. One of the most effective ways you can give is by making
                regular donations.`,
    },
    {
      heroImg: "/images/eatingmonkey.webp",
      heroImgAlt: "eating monkey",
      heroIcon: "/icons/food.svg",
      heroIconAlt: "food",
      heroIconWidth: 80,
      heroIconHeight: 80,
      title: "Bring your food charity — straight to your favorites pets.",
      paragraph: `      After your donation, the animal receives its favorite foods. You
                can support your favorite animals or any animal you care about
                and make a real personal impact. Never doubt that your donation
                can make a difference even if it is small.`,
      button: true,
    },
  ];
  return (
    <section className={styles.feed}>
      <div className={styles.feedContainer}>
        <h2>PAY AND FEED</h2>
        {PAYANDFEED.map((item, index) => (
          <div key={item.title}>
            <PayAndFeedHr number={0 + (1 + index).toString()} />
            <div
              className={`${styles.feedCard} ${index === PAYANDFEED.length - 1 ? styles.feedCardLast : ""}`}
            >
              <Image
                className={styles.animal}
                src={item.heroImg}
                alt={item.heroImgAlt}
                width={640}
                height={416}
                sizes="(min-width: 1200px) 550px, (min-width: 640px) 640px, 100vw"
              />
              <div className={styles.feedCardBody}>
                <Image
                  className={`${styles.logo}`}
                  src={item.heroIcon}
                  alt={item.heroIconAlt}
                  width={item.heroIconWidth}
                  height={item.heroIconHeight}
                />
                <h3>{item.title}</h3>
                <div className={styles.desktop}>
                  <p>{item.paragraph}</p>
                </div>
                {item.button == true ? (
                  <button type="button">
                    donate now
                    <RightArrow color="white" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PayAndFeed;
