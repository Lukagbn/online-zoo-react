import React from "react";
import styles from "./HeroIntro.module.scss";
import layout from "@/app/layout.module.scss";

function HeroIntro() {
  return (
    <section className={styles.heroIntro}>
      <div className={layout.container}>
        <div className={styles.introWelcome}>
          <img src="/images/online-zoo.png" alt="online zoo" />
          <div className={styles.heroIntroTextContent}>
            <h2>Welcome to the Online Zoo!</h2>
            <p>
              On our website, using live webcams, fans of all ages can observe
              various animals. Among them, are Giant pandas, eagles, alligators,
              forest gorillas, African lions, and others. It is the whole
              natural world in real-time in front of our cameras. We hope you
              will enjoy watching closely and explore animals’ behavior and
              habitats! Note: animals are not always on view on cameras, so
              please check back if you don't see anything.
            </p>
          </div>
        </div>
        <div className={styles.introHow}>
          <img src="/images/eagles.png" alt="eagles" />
          <div className={styles.heroIntroTextContent}>
            <h2>How we work</h2>
            <p>
              Online Zoo is a nonprofit committed to inspiring awareness and
              preservation of nature and wild animals in our zoo and worldwide.
              Every day, our experts work to safeguard the health and wellness
              of the animals. To continue these efforts, we need your help.
              We're so grateful to our numerous supporters. All donations, large
              and small, go a long way to the conservation efforts of our pets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroIntro;
