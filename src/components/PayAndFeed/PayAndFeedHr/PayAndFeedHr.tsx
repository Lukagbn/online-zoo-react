import React from "react";
import styles from "./PayAndFeed.module.scss";

interface PayAndFeedHrProps {
  number: string;
}

function PayAndFeedHr({ number }: PayAndFeedHrProps) {
  return (
    <div className={styles.hr}>
      <h3>{number}</h3>
      <hr />
    </div>
  );
}

export default PayAndFeedHr;
