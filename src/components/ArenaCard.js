import React from "react";
import * as styles from "./ArenaCard.module.css";

const ArenaCard = ({ ability }) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${ability.backgroundUrl})`,
      }}
    >
      <p style={{ left: 5, top: -2 }}>{ability.energy}</p>
      <svg
        style={{ left: 5, top: 63 }}
        height="10"
        width="10"
        viewBox="0 0 500 540"
        focusable="false"
      >
        <path
          fill="#BA3650"
          d="M89 533 c-9 -2 -21 -14 -26 -26 -9 -19 -6 -28 13 -50 47 -54 37 -147 -16 -147 -21 0 -40 -27 -40 -58 0 -13 9 -22 26 -26 20 -5 34 1 66 29 23 19 45 35 49 35 11 0 64 -88 104 -172 39 -82 47 -88 139 -108 35 -8 52 -8 60 0 6 6 12 42 14 80 l4 71 -84 82 c-79 77 -126 133 -117 141 2 2 23 15 47 30 34 21 42 32 42 56 0 28 -3 30 -38 30 -29 0 -39 -5 -47 -22 -7 -17 -20 -24 -49 -26 -34 -3 -43 1 -81 42 -23 25 -44 45 -46 45 -2 -1 -11 -3 -20 -6z"
        ></path>
      </svg>
      <p
        style={{
          left: 17,
          top: 60,
          fontSize: 11,
          textShadow: "0px 0px 3px #f00",
        }}
      >
        {ability.attack}
      </p>

      <svg
        style={{ left: 5, top: 78 }}
        height="10"
        width="10"
        viewBox="0 0 50 59"
        focusable="false"
      >
        <path
          fill="#319b6a"
          d="M23 1.00386C17.3737 3.26026 12.9417 7.34684 7.00463 9.28318C4.65826 10.0484 2.12323 10.585 1.3179 13.2276C-2.50571 25.7742 5.07861 43.4481 14.0394 51.8264C17.5601 55.1182 22.7863 59.9755 28 58.1273C41.2114 53.444 48.0513 37.7689 49.7106 25C50.1513 21.6095 51.2185 14.6212 48.9722 11.7276C46.805 8.93578 41.1011 8.52748 38 7.09877C33.4213 4.9893 28.4138 -1.16729 23 1.00386z"
        ></path>
      </svg>
      <p
        style={{
          left: 17,
          top: 75,
          fontSize: 11,
          textShadow: "0px 0px 3px #0a0",
        }}
      >
        {ability.defense}
      </p>

      <p
        style={{
          left: "25%",
          top: 5,
          width: "100%",
          fontSize: 7,
        }}
      >
        {ability.name}
      </p>

      <img
        style={{
          right: 10,
          top: 70,
        }}
        height="12"
        width="12"
        src={ability.effectIconUrl}
        alt="icon"
      />
    </div>
  );
};

export default ArenaCard;
