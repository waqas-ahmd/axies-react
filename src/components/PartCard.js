import React from "react";
import { COLORS } from "../assets/colors";
import icons from "./geneIcons";
import * as styles from "./PartCard.module.css";

const PartCard = ({ gene, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <div
          style={{ backgroundColor: COLORS[gene.class.toUpperCase()] }}
          className={styles.icon}
        >
          {icons[gene.part + "Icon"]}
        </div>
        <div className={styles.title}>
          <div>{gene.name}</div>
          <div>{gene.subtitle}</div>
        </div>
      </div>
      <div className={styles.subheader}>
        <div>
          <div>
            <svg viewBox="0 0 38 38" focusable="false">
              <path
                fill="#ffd110"
                d="M12 0.648918C-0.39629 4.39407 -3.73213 21.1882 3.63812 30.9568C8.44733 37.3309 17.5178 39.3734 25 37.2106C38.6802 33.2564 42.2757 15.1117 32.787 5.10802C27.8135 -0.135471 18.8003 -1.40557 12 0.648918z"
              ></path>
              <path
                fill="#000000"
                d="M18 7C19.1561 9.17049 21.3263 11.4597 21.4583 14.0108C21.8944 22.4352 12.9755 20.2787 9 17C6.63359 34.304 35.865 29.5282 28.4236 14.0154C27.6013 12.3011 26.4186 10.8409 24.8935 9.70293C22.8373 8.16861 20.4376 7.58607 18 7z"
              ></path>
            </svg>
          </div>
          <div style={{ color: "#ffd110" }}>{gene.energy}</div>
        </div>
        <div>
          <div>
            <svg viewBox="0 0 500 540" focusable="false">
              <path
                fill="#BA3650"
                d="M89 533 c-9 -2 -21 -14 -26 -26 -9 -19 -6 -28 13 -50 47 -54 37 -147 -16 -147 -21 0 -40 -27 -40 -58 0 -13 9 -22 26 -26 20 -5 34 1 66 29 23 19 45 35 49 35 11 0 64 -88 104 -172 39 -82 47 -88 139 -108 35 -8 52 -8 60 0 6 6 12 42 14 80 l4 71 -84 82 c-79 77 -126 133 -117 141 2 2 23 15 47 30 34 21 42 32 42 56 0 28 -3 30 -38 30 -29 0 -39 -5 -47 -22 -7 -17 -20 -24 -49 -26 -34 -3 -43 1 -81 42 -23 25 -44 45 -46 45 -2 -1 -11 -3 -20 -6z"
              ></path>
            </svg>
          </div>
          <div style={{ color: "#BA3650" }}>{gene.attack}</div>
        </div>
        <div>
          <div>
            <svg viewBox="0 0 50 59" focusable="false">
              <path
                fill="#319b6a"
                d="M23 1.00386C17.3737 3.26026 12.9417 7.34684 7.00463 9.28318C4.65826 10.0484 2.12323 10.585 1.3179 13.2276C-2.50571 25.7742 5.07861 43.4481 14.0394 51.8264C17.5601 55.1182 22.7863 59.9755 28 58.1273C41.2114 53.444 48.0513 37.7689 49.7106 25C50.1513 21.6095 51.2185 14.6212 48.9722 11.7276C46.805 8.93578 41.1011 8.52748 38 7.09877C33.4213 4.9893 28.4138 -1.16729 23 1.00386z"
              ></path>
            </svg>
          </div>
          <div style={{ color: "#319b6a" }}>{gene.defense}</div>
        </div>
      </div>
      <div className={styles.body}>
        <div>{gene.description}</div>
      </div>
      <div className={styles.footer}>
        <div>{gene.footer1}</div>
        <div>{gene.footer2}</div>
      </div>
    </div>
  );
};

export default PartCard;
