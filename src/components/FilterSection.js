import React from "react";
import * as styles from "./FilterSection.module.css";

const checkBoxes = [
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
  {
    iconPath:
      "M7.933 4.886a1.91 1.91 0 100-3.82 1.91 1.91 0 000 3.82M12.713 2.635a1.91 1.91 0 100 3.82 1.91 1.91 0 000-3.82M5.064 4.544a1.91 1.91 0 10-3.82 0 1.91 1.91 0 003.82 0M7.916 6.11a4.487 4.487 0 100 8.972 4.487 4.487 0 000-8.973",
    name: "Beast",
    color: "#FFB812",
  },
];

const FilterSection = () => {
  return (
    <div className={styles.section}>
      <div className={styles.titleGroup}>
        <h3>Filters</h3>
        <button>Clear Basic</button>
      </div>

      <div>
        <div>Basic</div>
        <div>Advanced</div>
        <div>Ronin</div>
      </div>

      <div>
        <div>Axie ID</div>
        <input placeholder="Find Similiar Axes" />
      </div>

      <div>
        <h4>CLASS</h4>
        {checkBoxes.map((checkbox, index) => (
          <div key={index} className={styles.checkbox}>
            <svg viewBox="0 0 16 16" focusable="false">
              <path fill={checkbox.color} d={checkbox.iconPath}></path>
            </svg>
            <div className={styles.label}>{checkbox.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;