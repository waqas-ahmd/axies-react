import React, { useContext, useState } from "react";
import { COLORS } from "../assets/colors";
import { iconPath } from "../assets/paths";
import { FiltersContext } from "../filtersContext";
import * as styles from "./FilterSection.module.css";
import PartsModal from "./PartsModal";
import SelectedGeneCard from "./SelectedGeneCard";
import Switch from "./Switch";

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
    genesIncluded,
    setGenesIncluded,
    genesExcluded,
    setGenesExcluded,
    r1Genes,
    setR1Genes,
    r2Genes,
    setR2Genes,
    getAxies,
    advancedEnabled,
    setAdvancedEnabled,
    pagesAtOnce,
    setPagesAtOnce,
    minEnergy,
    setMinEnergy,
    maxEnergy,
    setMaxEnergy,
    minAttack,
    setMinAttack,
    minDefense,
    setMinDefense,
    minPurity,
    setMinPurity,
    setRonin,
    roninValue,
    setRoninValue,
    minPurity1,
    setMinPurity1,
    maxPurity,
    setMaxPurity,
  } = useContext(FiltersContext);

  const [filterSection, setFilterSection] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalFlag, setModalFlag] = useState("included");
  const [breedSlider, setBreedSlider] = useState(7);
  const [mysticSlider, setMysticSlider] = useState(0);

  const stats = {
    Heart: [hp, setHp],
    Lightning: [speed, setSpeed],
    Star: [skill, setSkill],
    Fire: [morale, setMorale],
  };

  const updateRonin = (e) => {
    setRoninValue(e.target.value);
    let prefix = e.target.value.slice(0, 2);
    let ronin = prefix === "0x" ? e.target.value : `0x${e.target.value}`;
    if (e.target.value.length > 0) {
      setRonin(ronin);
    } else {
      setRonin(null);
    }
  };

  const addGeneToGroup = (gene) => {
    if (modalFlag === "included") {
      setGenesIncluded((p) => [...p, gene]);
    }
    if (modalFlag === "excluded") {
      setGenesExcluded((p) => [...p, gene]);
    }
    if (modalFlag === "r1") {
      setR1Genes((p) => [...p, gene]);
    }
    if (modalFlag === "r2") {
      setR2Genes((p) => [...p, gene]);
    }
  };

  const removeGeneFromGroup = (gene) => {
    if (modalFlag === "included") {
      setGenesIncluded((p) =>
        [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
      );
    }
    if (modalFlag === "excluded") {
      setGenesExcluded((p) =>
        [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
      );
    }
    if (modalFlag === "r1") {
      setR1Genes((p) =>
        [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
      );
    }
    if (modalFlag === "r2") {
      setR2Genes((p) =>
        [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
      );
    }
  };

  const removeR1Gene = (gene) => {
    setR1Genes((p) =>
      [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
    );
  };
  const removeR2Gene = (gene) => {
    setR2Genes((p) =>
      [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
    );
  };
  const removeExcludedGene = (gene) => {
    setGenesExcluded((p) =>
      [...p].filter((i) => i.name !== gene.name || i.part !== gene.part)
    );
  };
  const removeAndRefresh = (gene) => {
    removeGeneFromGroup(gene);
    getAxies();
  };

  const showModal = (flag) => {
    setModalFlag(flag);
    setModal(true);
  };

  const closeModal = () => {
    if (modalFlag === "included") {
      getAxies();
    }
    setModal(false);
  };

  const basicFilters = () => (
    <>
      {/* <div className={styles.searchGroup}>
        <div>Axie ID</div>
        <input placeholder="Find Similiar Axes" />
      </div> */}

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
            onMouseUp={(e) => setMaxBreed(+e.target.value)}
            type="range"
            onChange={(e) => setBreedSlider(+e.target.value)}
            value={breedSlider}
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
            onMouseUp={(e) => setMinMystic(+e.target.value)}
            onChange={(e) => setMysticSlider(+e.target.value)}
            type="range"
            value={mysticSlider}
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
          <h4>PURITY %</h4>
        </div>
        <div style={frsbc}>
          <div>
            <div style={{ fontSize: "small" }}>Min</div>
            <input
              value={minPurity1}
              onChange={(e) => setMinPurity1(+e.target.value)}
              className={styles.textBox}
              style={{ width: 70 }}
              type="number"
              min={0}
              max={maxPurity}
            />
          </div>
          <div>
            <div style={{ fontSize: "small" }}>Max</div>
            <input
              value={maxPurity}
              onChange={(e) => setMaxPurity(+e.target.value)}
              className={styles.textBox}
              style={{ width: 70 }}
              type="number"
              min={minPurity1}
              max={100}
            />
          </div>
        </div>
      </div>

      <div>
        <div style={frsbc}>
          <h4>PARTS</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            onClick={() => showModal("included")}
            className={styles.searchBar}
            type="search"
            placeholder="Search Parts and abilities"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {genesIncluded.map((item, key) => (
            <SelectedGeneCard item={item} key={key} remove={removeAndRefresh} />
          ))}
        </div>
      </div>
    </>
  );

  const advancedFilters = () => (
    <>
      <div className={styles.infoBox}>
        <div>
          <svg height={16} width={16} viewBox="0 0 24 24">
            <g fill="#fff" stroke="#fff" strokeLinecap="square" strokeWidth={2}>
              <circle cx={12} cy={12} fill="none" r={11} />
              <path fill="none" d="M11.959 11v6" />
              <circle cx={11.959} cy={7} r={1} stroke="none" />
            </g>
          </svg>
        </div>
        <div>
          <p>
            This feature only filters the result of the basic filter! Use it to
            visually narrow down your search.
          </p>
          <p>Protip: Try one filter before making complex combinations.</p>
        </div>
      </div>
      <div style={frsbc}>
        <h4>ENABLED?</h4>
        <div>
          <Switch
            checked={advancedEnabled}
            onClick={() => setAdvancedEnabled((v) => !v)}
          />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {!advancedEnabled ? <div className={styles.blocker}></div> : null}
        <div>
          <h4>PAGES AT ONCE</h4>
          <div style={frsbc}>
            {[1, 2, 3, 4, 5].map((pages, index) => (
              <div style={frsbc} key={index}>
                <input
                  checked={pagesAtOnce === pages}
                  type="radio"
                  name="pages"
                  onClick={() => setPagesAtOnce(pages)}
                />
                <div style={{ marginLeft: 5 }}>{pages}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <h3>BATTLE FILTERS</h3>
          <div>
            <h4>ENERGY</h4>
            <div style={frsbc}>
              <div>
                <div>Min</div>
                <input
                  value={minEnergy}
                  className={styles.numInput}
                  onChange={(e) => setMinEnergy(+e.target.value)}
                  min={0}
                  max={maxEnergy}
                  type="number"
                />
              </div>
              <div>
                <div>Max</div>
                <input
                  value={maxEnergy}
                  onChange={(e) => setMaxEnergy(+e.target.value)}
                  className={styles.numInput}
                  min={minEnergy}
                  max={5}
                  type="number"
                />
              </div>
            </div>
          </div>

          <div>
            <div style={frsbc}>
              <h4>ATTACK</h4>
              <div style={{ fontSize: "small" }}>Max</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="range"
                value={minAttack}
                onChange={(e) => setMinAttack(+e.target.value)}
                min={0}
                max={500}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  border: "1px solid #888",
                  padding: "0px 5px",
                  marginLeft: 5,
                  width: 60,
                  textAlign: "right",
                }}
              >
                {minAttack}
              </div>
            </div>
          </div>

          <div>
            <div style={frsbc}>
              <h4>DEFENCE</h4>
              <div style={{ fontSize: "small" }}>Max</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="range"
                value={minDefense}
                onChange={(e) => setMinDefense(+e.target.value)}
                min={0}
                max={400}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  border: "1px solid #888",
                  padding: "0px 5px",
                  marginLeft: 5,
                  width: 60,
                  textAlign: "right",
                }}
              >
                {minDefense}
              </div>
            </div>
          </div>

          <div>
            <div style={frsbc}>
              <h4>EXCLUDED PARTS</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                onClick={() => showModal("excluded")}
                className={styles.searchBar}
                type="search"
                placeholder="Search Parts and abilities"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {genesExcluded.map((item, key) => (
                <SelectedGeneCard
                  item={item}
                  key={key}
                  remove={removeExcludedGene}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>BREEDING FILTERS</h3>

          <div>
            <div style={frsbc}>
              <h4>GENES PURITY %</h4>
              <div style={{ fontSize: "small" }}>Min</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="range"
                value={minPurity}
                onChange={(e) => setMinPurity(+e.target.value)}
                min={0}
                max={100}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  border: "1px solid #888",
                  padding: "0px 5px",
                  marginLeft: 5,
                  width: 60,
                  textAlign: "right",
                }}
              >
                {minPurity}
              </div>
            </div>
          </div>

          <div>
            <div style={frsbc}>
              <h4>R1 GENES</h4>
            </div>
            <div style={frsbc}>
              <div style={frsbc}>
                <div
                  onClick={() => setR1Genes(genesIncluded)}
                  className={styles.genesButtonBlue}
                >
                  Copy D
                </div>
                <div
                  onClick={() => setR1Genes(r2Genes)}
                  className={styles.genesButtonBlue}
                >
                  Copy R2
                </div>
              </div>
              <div
                onClick={() => setR1Genes([])}
                className={styles.genesButtonRed}
              >
                Reset R1
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                onClick={() => showModal("r1")}
                className={styles.searchBar}
                type="search"
                placeholder="Search Parts and abilities"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {r1Genes.map((item, key) => (
                <SelectedGeneCard item={item} key={key} remove={removeR1Gene} />
              ))}
            </div>
          </div>

          <div>
            <div style={frsbc}>
              <h4>R2 GENES</h4>
            </div>
            <div style={frsbc}>
              <div style={frsbc}>
                <div
                  onClick={() => setR2Genes(genesIncluded)}
                  className={styles.genesButtonBlue}
                >
                  Copy D
                </div>
                <div
                  onClick={() => setR2Genes(r1Genes)}
                  className={styles.genesButtonBlue}
                >
                  Copy R1
                </div>
              </div>
              <div
                onClick={() => setR2Genes([])}
                className={styles.genesButtonRed}
              >
                Reset R2
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                onClick={() => showModal("r2")}
                className={styles.searchBar}
                type="search"
                placeholder="Search Parts and abilities"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {r2Genes.map((item, key) => (
                <SelectedGeneCard item={item} key={key} remove={removeR2Gene} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const roninFilters = () => {
    return (
      <>
        <div className={styles.infoBox}>
          <div>
            <svg height={16} width={16} viewBox="0 0 24 24">
              <g
                fill="#fff"
                stroke="#fff"
                strokeLinecap="square"
                strokeWidth={2}
              >
                <circle cx={12} cy={12} fill="none" r={11} />
                <path fill="none" d="M11.959 11v6" />
                <circle cx={11.959} cy={7} r={1} stroke="none" />
              </g>
            </svg>
          </div>
          <div>
            <p>
              This feature will show all the Axies in any given Ronin account.
            </p>
            <p>
              Protip: Use it either for a quick peek on your own Axies or to
              check out another player's Axies
            </p>
          </div>
        </div>
        <div>
          <h4>RONIN ADDRESS</h4>
          <input
            className={styles.searchBar}
            value={roninValue}
            onChange={updateRonin}
            type="search"
            placeholder="ronin"
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.section}>
      <div className={styles.titleGroup}>
        <h3>Filters</h3>
        <button onClick={resetFilters}>Clear Basic</button>
      </div>

      <div className={styles.tabs}>
        <div
          onClick={() => setFilterSection(0)}
          className={filterSection === 0 ? styles.selectedTab : ""}
        >
          Basic
        </div>
        <div
          onClick={() => setFilterSection(1)}
          className={filterSection === 1 ? styles.selectedTab : ""}
        >
          Advanced
        </div>
        <div
          onClick={() => setFilterSection(2)}
          className={filterSection === 2 ? styles.selectedTab : ""}
        >
          Ronin
        </div>
      </div>

      {
        <PartsModal
          array={
            modalFlag === "included"
              ? genesIncluded
              : modalFlag === "excluded"
              ? genesExcluded
              : modalFlag === "r1"
              ? r1Genes
              : modalFlag === "r2"
              ? r2Genes
              : []
          }
          add={addGeneToGroup}
          remove={removeGeneFromGroup}
          show={modal}
          hide={closeModal}
        />
      }

      {filterSection === 0 ? basicFilters() : null}
      {filterSection === 1 ? advancedFilters() : null}
      {filterSection === 2 ? roninFilters() : null}
    </div>
  );
};

export default FilterSection;
