import React from "react";
import styles from "./FetchError.module.scss";

interface FetchClassProp {
  className?: string;
}

function FetchError({ className }: FetchClassProp) {
  return (
    <div className={`${styles.errorMessage} ${className || ""}`}>
      Something went wrong. Please, refresh the page!
    </div>
  );
}

export default FetchError;
