import React from "react";
import { COLORS } from "../assets/colors";
import {
  backIcon,
  earsIcon,
  eyesIcon,
  hornIcon,
  mouthIcon,
  tailIcon,
} from "./geneIcons";
import * as styles from "./GenesCard.module.css";

const GenesCard = ({ genes }) => {
  const { eyes, ears, mouth, horn, back, tail } = genes;
  console.log(genes);
  const getIcon = (index) => {
    if (index === 0) return eyesIcon;
    if (index === 1) return earsIcon;
    if (index === 2) return mouthIcon;
    if (index === 3) return hornIcon;
    if (index === 4) return backIcon;
    if (index === 5) return tailIcon;
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
