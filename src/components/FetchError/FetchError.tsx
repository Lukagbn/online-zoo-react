import React from "react";
import styles from "./FetchError.module.scss";

function FetchError() {
  return (
    <div className={styles.errorMessage}>
      Something went wrong. Please, refresh the page!
    </div>
  );
}

export default FetchError;
