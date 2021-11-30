import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import genesList from "../assets/genesList";
import PartCard from "./PartCard";
import * as styles from "./PartsModal.module.css";
import SelectedGeneCard from "./SelectedGeneCard";

const PartsModal = ({ show, hide, array, add, remove }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState(genesList);
  useEffect(() => {
    let searchTags = searchQuery
      .toLowerCase()
      .split(" ")
      .filter((t) => t !== "");
    if (searchTags.length === 0) {
      setFilteredList(genesList);
    } else {
      let filtered = genesList.filter((gene) => {
        for (let tag of searchTags) {
          if (gene.name.toLowerCase().includes(tag)) {
            return true;
          }
        }
        return false;
      });
      setFilteredList(filtered);
    }
  }, [searchQuery]);
  if (!show) return null;
  return (
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          hide();
        }
      }}
      className={styles.modalBackground}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className={styles.modal}
      >
        <div className={styles.header}>
          <input
            className={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search Parts and Abilties"
          />
          <div className={styles.selectedGenes}>
            {array.map((item, key) => (
              <SelectedGeneCard item={item} key={key} remove={remove} />
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.grid}>
            {filteredList
              .filter((i) => !array.includes(i))
              .map((geneItem, index) => (
                <PartCard
                  onClick={() => add(geneItem)}
                  key={index}
                  gene={geneItem}
                />
              ))}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={hide}>Filter</button>
        </div>
      </div>
    </div>
  );
};

export default PartsModal;
