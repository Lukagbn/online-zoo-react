import RightArrow from "@/components/ArrowButtons/RightArrow/RightArrow";
import React from "react";
import styles from "./page.module.scss";

function page() {
  return (
    <div className={styles.getInTouch}>
      <img src="/images/getintouch.png" alt="get in touch" />
      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <h2>Get in touch</h2>
          <p>
            Whether you have a question, or would like to say hello, we're happy
            to hear from you. Please use the form to send us a message and we'll
            get back to you as soon as we can. Whether you have a question, or
            would like to say hello, we're happy to hear from you. Please use
            the form to send us a message and we'll get back to you as soon as
            we can.
          </p>
        </div>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">your name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="First and last name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">your email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">subject</label>
            <input
              id="subject"
              type="text"
              required
              placeholder="Enter the subject"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">message</label>
            <textarea id="message" placeholder="Enter your message"></textarea>
          </div>
          <button type="submit">
            send message
            <RightArrow color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
