import React from "react";
import { COLORS } from "../assets/colors";
import icons from "./geneIcons";
import * as styles from "./GenesCard.module.css";

const GenesCard = ({ genes }) => {
  const { eyes, ears, mouth, horn, back, tail } = genes;
  const getIcon = (index) => {
    if (index === 0) return icons.eyesIcon;
    if (index === 1) return icons.earsIcon;
    if (index === 2) return icons.mouthIcon;
    if (index === 3) return icons.hornIcon;
    if (index === 4) return icons.backIcon;
    if (index === 5) return icons.tailIcon;
  };
  return (
    <div className={styles.card}>
      <table>
        <tbody>
          {[eyes, ears, mouth, horn, back, tail].map((part, index) => (
            <tr key={index}>
              <td
                className={styles.icon}
                style={{
                  backgroundColor: COLORS[part.d.cls.toUpperCase()],
                }}
              >
                {getIcon(index)}
              </td>
              <td
                style={{
                  color: COLORS[part.d.cls.toUpperCase()],
                }}
              >
                {part.d.name}
              </td>
              <td
                style={{
                  color: COLORS[part.r1.cls.toUpperCase()],
                }}
              >
                {part.r1.name}
              </td>
              <td
                style={{
                  color: COLORS[part.r2.cls.toUpperCase()],
                }}
              >
                {part.r2.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenesCard;
