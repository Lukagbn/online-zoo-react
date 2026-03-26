import React, { useEffect, useRef, useState } from "react";
import LeftArrow from "../LeftArrow/LeftArrow";
import RightArrow from "../RightArrow/RightArrow";
import styles from "./Testimonials.module.scss";
import layout from "@/app/layout.module.scss";
import TestimonialsCard, {
  TestimonialsProps,
} from "../TestimonialsCard/TestimonialsCard";

interface TestimonialsApiResponse {
  data: TestimonialsProps[];
}

function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverRight, setHoverRight] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [testimonialData, setTestimonialData] = useState<
    TestimonialsProps[] | null
  >(null);
  const scrollRight = () => {
    if (!containerRef.current) return;
    const { scrollLeft, offsetWidth, scrollWidth } = containerRef.current;
    const isAtEnd = scrollLeft + offsetWidth >= scrollWidth;
    if (isAtEnd) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const scrollLeft = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth } = containerRef.current;
    const isAtStart = scrollLeft <= 0;
    if (isAtStart) {
      containerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  async function fetchTestimonials() {
    try {
      setloading(true);
      const res = await fetch(
        "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback",
      );
      const result: TestimonialsApiResponse = await res.json();
      if (!res.ok) {
        setError(true);
        setloading(false);
        return;
      }
      setTestimonialData(result.data);
      console.log(result.data);
    } catch (err) {
      setError(true);
      setloading(false);
      console.log("error:", err);
    }
  }
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section
      className={
        error
          ? `${styles.testimonials} ${styles.removePadding}`
          : `${styles.testimonials}`
      }
    >
      {" "}
      <div className={styles.testimonialsTop}>
        <div className={`${styles.testimonialsHeader} ${layout.container}`}>
          <h2>WHAT OUR USERS THINK</h2>
          <p>
            We are continuously striving to improve the experiences of our
            future guests. Below you can leave your own feedback, or simply view
            feedback from past clients.
          </p>
        </div>
        {error ? (
          <div className={styles.errorMessage}>
            Something went wrong. Please, refresh the page!
          </div>
        ) : (
          <div
            className={`${styles.testimonialsCardsWrapper} ${!loading ? "" : styles.loadingCards}`}
            ref={containerRef}
          >
            {testimonialData === null ? (
              <div className={styles.loader}></div>
            ) : (
              testimonialData.map((item, index) => (
                <TestimonialsCard
                  key={index}
                  city={item.city}
                  month={item.month}
                  name={item.name}
                  text={item.text}
                  year={item.year}
                />
              ))
            )}
          </div>
        )}
      </div>
      <div className={styles.testimonialDots}>
        <div className={styles.dotActive}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <div className={`${styles.testimonialBtnContainer} ${layout.container}`}>
        <div className={styles.btnContainer}>
          <button
            type="button"
            className={styles.testiArrowBtn}
            onMouseEnter={() => setHoverLeft(true)}
            onMouseLeave={() => setHoverLeft(false)}
          >
            <LeftArrow
              onClick={() => scrollLeft()}
              color={hoverLeft ? "#20113d" : "white"}
            />
          </button>
          <button
            type="button"
            className={styles.testiArrowBtn}
            onMouseEnter={() => setHoverRight(true)}
            onMouseLeave={() => setHoverRight(false)}
          >
            <RightArrow
              onClick={() => scrollRight()}
              color={hoverRight ? "#20113d" : "white"}
            />
          </button>
        </div>
        <button type="button" className={styles.feedbackBtn}>
          leave feedback
          <RightArrow color="white" />
        </button>
      </div>
      <img
        className={styles.testimonialsImg}
        src="/images/testimonialspanda.png"
        alt="panda"
      />
    </section>
  );
}

export default Testimonials;
