import React from "react";
import styles from "./TouchAnimal.module.scss";

function TouchAnimal() {
  return (
    <div className={styles.touchAnimal}>
      <img src="/images/touchAnimal.png" alt="touch animal" />
    </div>
  );
}

export default TouchAnimal;
