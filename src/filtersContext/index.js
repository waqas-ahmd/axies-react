import React, { createContext, useEffect, useState } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [pureness, setPureness] = useState([]);
  const [hp, setHp] = useState(27);
  const [skill, setSkill] = useState(27);
  const [speed, setSpeed] = useState(27);
  const [morale, setMorale] = useState(27);
  const [numMystic, setNumMystic] = useState([]);
  const [breedCount, setBreedCount] = useState([]);
  const [minMystic, setMinMystic] = useState(0);
  const [maxBreed, setMaxBreed] = useState(7);
  const [minPureness, setMinPureness] = useState(1);

  const addOrRemoveClass = (className) => {
    if (classes.includes(className)) {
      setClasses(classes.filter((c) => c !== className));
    } else {
      setClasses((prev) => [...prev, className]);
    }
  };

  useEffect(() => {
    setBreedCount([0, 1, 2, 3, 4, 5, 6, 7].slice(0, maxBreed));
  }, [maxBreed]);

  useEffect(() => {
    setNumMystic([0, 1, 2, 3, 4, 5, 6].slice(minMystic, 7));
  }, [minMystic]);

  useEffect(() => {
    setPureness([1, 2, 3, 4, 5, 6].slice(minPureness, 6));
  }, [minPureness]);

  const resetFilters = () => {
    setClasses([]);
    setPureness([]);
    setHp(27);
    setSkill(27);
    setSpeed(27);
    setMorale(27);
    setNumMystic([]);
    setBreedCount([]);
    setMinMystic(0);
    setMaxBreed(7);
    setMinPureness(1);
  };

  return (
    <FiltersContext.Provider
      value={{
        classes,
        addOrRemoveClass,
        pureness,
        setPureness,
        hp,
        setHp,
        skill,
        setSkill,
        speed,
        setSpeed,
        morale,
        setMorale,
        breedCount,
        numMystic,
        minMystic,
        setMinMystic,
        maxBreed,
        setMaxBreed,
        minPureness,
        setMinPureness,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
