import React from "react";
import * as styles from "./switch.module.css";

const Switch = ({ checked, onClick }) => {
  return (
    <div onClick={onClick} className={styles.button}>
      <div
        style={{ opacity: checked ? 0 : 1 }}
        className={styles.knobOff}
      ></div>
      <div style={{ opacity: checked ? 1 : 0 }} className={styles.knobOn}></div>
    </div>
  );
};

export default Switch;
