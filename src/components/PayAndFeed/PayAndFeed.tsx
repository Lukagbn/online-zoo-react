import React from "react";
import styles from "./PayAndFeed.module.scss";
import RightArrow from "../ArrowButtons/RightArrow/RightArrow";
import layout from "@/app/layout.module.scss";
import PayAndFeedHr from "./PayAndFeedHr/PayAndFeedHr";

interface PayAndFeedProps {
  heroImg: string;
  heroImgAlt: string;
  heroIcon: string;
  heroIconAlt: string;
  title: string;
  paragraph: string;
  button?: boolean;
}

function PayAndFeed() {
  const PAYANDFEED: PayAndFeedProps[] = [
    {
      heroImg: "/images/monkey.png",
      heroImgAlt: "mokey",
      heroIcon: "/icons/heart.png",
      heroIconAlt: "heart",
      title: "Your donation has an impact",
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
      heroImg: "/images/banana.png",
      heroImgAlt: "banana",
      heroIcon: "/icons/donation.png",
      heroIconAlt: "donation",
      title: "Make a donation",
      paragraph: `      You can donate through your credit card without any fees. It is
                easy and safe. We do not keep donors' personal information on an
                online network. Choose an amount to give and the pet's name if
                needed. One of the most effective ways you can give is by making
                regular donations.`,
    },
    {
      heroImg: "/images/eatingmonkey.png",
      heroImgAlt: "banana",
      heroIcon: "/icons/food.png",
      heroIconAlt: "food",
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
              <img
                className={styles.animal}
                src={item.heroImg}
                alt={item.heroImgAlt}
              />
              <div className={styles.feedCardBody}>
                <img
                  className={`${styles.logo} ${styles.food}`}
                  src={item.heroIcon}
                  alt={item.heroIconAlt}
                />
                <h3>{item.title}</h3>
                <div className={styles.desktop}>
                  <p>{item.paragraph}</p>
                </div>
                {item.button == true ? (
                  <button type="button" className="donate-volunteers">
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
