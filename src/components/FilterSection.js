import React, { useContext } from "react";
import { COLORS } from "../assets/colors";
import { iconPath } from "../assets/paths";
import { FiltersContext } from "../filtersContext";
import * as styles from "./FilterSection.module.css";

const frsbc = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const FilterSection = () => {
  const {
    addOrRemoveClass,
    hp,
    setHp,
    classes,
    skill,
    setSkill,
    speed,
    setSpeed,
    morale,
    setMorale,
    minMystic,
    setMinMystic,
    maxBreed,
    setMaxBreed,
    minPureness,
    setMinPureness,
    resetFilters,
  } = useContext(FiltersContext);

  const stats = {
    Heart: [hp, setHp],
    Lightning: [speed, setSpeed],
    Star: [skill, setSkill],
    Fire: [morale, setMorale],
  };
  return (
    <div className={styles.section}>
      <div className={styles.titleGroup}>
        <h3>Filters</h3>
        <button onClick={resetFilters}>Clear Basic</button>
      </div>
      {/* 
      <div className={styles.tabs}>
        <div>Basic</div>
        <div>Advanced</div>
        <div>Ronin</div>
      </div> */}

      <div className={styles.searchGroup}>
        <div>Axie ID</div>
        <input placeholder="Find Similiar Axes" />
      </div>

      <div>
        <h4>CLASS</h4>
        <div className={styles.checkboxes}>
          {[
            "Beast",
            "Plant",
            "Aquatic",
            "Bird",
            "Reptile",
            "Dawn",
            "Dusk",
            "Mech",
            "Bug",
          ].map((checkbox, index) => (
            <div key={index} className={styles.checkbox}>
              <input
                checked={classes.includes(checkbox)}
                onChange={() => addOrRemoveClass(checkbox)}
                type="checkbox"
              />
              <svg viewBox="0 0 16 16" focusable="false">
                <path
                  fill={COLORS[checkbox.toUpperCase()]}
                  d={iconPath[checkbox.toUpperCase()]}
                ></path>
              </svg>
              <div className={styles.label}>{checkbox}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={frsbc}>
          <h4>STATS</h4>
          <div style={{ fontSize: "small" }}>Min</div>
        </div>
        {["Heart", "Lightning", "Star", "Fire"].map((icon, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            <svg
              style={{ height: 27, width: 27 }}
              viewBox="0 0 16 16"
              focusable="false"
            >
              <path
                fill={COLORS[icon.toUpperCase()]}
                d={iconPath[icon.toUpperCase()]}
              ></path>
            </svg>
            <input
              onChange={(e) => stats[icon][1](+e.target.value)}
              type="range"
              value={stats[icon][0]}
              min={27}
              max={60}
              style={{ width: "100%" }}
            />
            <div
              style={{
                border: "1px solid #888",
                padding: "0px 5px",
                marginLeft: 5,
              }}
            >
              {stats[icon][0]}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div style={frsbc}>
          <h4>BREEDS</h4>
          <div style={{ fontSize: "small" }}>Max</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            onChange={(e) => setMaxBreed(+e.target.value)}
            type="range"
            value={maxBreed}
            min={0}
            max={7}
            style={{ width: "100%" }}
          />
          <div
            style={{
              border: "1px solid #888",
              padding: "0px 5px",
              marginLeft: 5,
            }}
          >
            {maxBreed}
          </div>
        </div>
      </div>

      <div>
        <div style={frsbc}>
          <h4>MYSTIC</h4>
          <div style={{ fontSize: "small" }}>Min</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            onChange={(e) => setMinMystic(+e.target.value)}
            type="range"
            value={minMystic}
            min={0}
            max={6}
            style={{ width: "100%" }}
          />
          <div
            style={{
              border: "1px solid #888",
              padding: "0px 5px",
              marginLeft: 5,
            }}
          >
            {minMystic}
          </div>
        </div>
      </div>

      <div>
        <div style={frsbc}>
          <h4>PURENESS</h4>
          <div style={{ fontSize: "small" }}>Min</div>
        </div>
        <div style={frsbc}>
          {[1, 2, 3, 4, 5, 6].map((pureness, index) => (
            <div style={frsbc} key={index}>
              <input
                onChange={() => setMinPureness(pureness)}
                checked={minPureness === pureness}
                type="radio"
                name="pureness"
              />
              <div style={{ marginLeft: 5 }}>{pureness}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={frsbc}>
          <h4>PARTS</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            style={{
              padding: 10,
              width: "100%",
              border: "1px solid #999",
              outline: "none",
              backgroundColor: "transparent",
            }}
            type="search"
            placeholder="Search Parts and abilities"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
