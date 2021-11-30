import React from "react";
import { COLORS } from "../assets/colors";
import icons from "./geneIcons";
import * as styles from "./SelectedGeneCard.module.css";
const SelectedGeneCard = ({ item, remove }) => {
  return (
    <div
      style={{ backgroundColor: COLORS[item.class.toUpperCase()] }}
      className={styles.selectedGeneCard}
    >
      <div className={styles.icon}>{icons[item.part + "Icon"]}</div>
      <div
        style={{
          color: "#333",
          margin: "0px 5px",
          fontWeight: 600,
        }}
      >
        {item.name}
      </div>
      <div onClick={() => remove(item)} style={{ height: 16, width: 16 }}>
        <svg
          style={{ height: "100%", width: "100%" }}
          viewBox="0 0 512 512"
          focusable="false"
        >
          <path
            fill="#666"
            d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SelectedGeneCard;
