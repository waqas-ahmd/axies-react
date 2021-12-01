import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchAxies } from "../api";
import { AxieGene } from "agp-npm/dist/axie-gene";

export const FiltersContext = createContext();

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const FiltersProvider = ({ children }) => {
  let query = useQuery();
  // Basic Filters
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
  const [genesIncluded, setGenesIncluded] = useState([]);
  // Axies Data State Management
  const [axies, setAxies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalAxies, setTotalAxies] = useState("");
  const [dataPerPage, setDataPerPage] = useState(30);
  const [sorting, setSorting] = useState("PriceAsc");
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [filteredAxies, setFilteredAxies] = useState([]);
  // Advanced Filters
  const [advancedEnabled, setAdvancedEnabled] = useState(false);
  const [genesExcluded, setGenesExcluded] = useState([]);
  const [r1Genes, setR1Genes] = useState([]);
  const [r2Genes, setR2Genes] = useState([]);
  const [pagesAtOnce, setPagesAtOnce] = useState(1);
  const [minEnergy, setMinEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(5);
  const [minAttack, setMinAttack] = useState(0);
  const [minDefense, setMinDefense] = useState(0);
  const [minPurity, setMinPurity] = useState(0);

  const addOrRemoveClass = (className) => {
    if (classes.includes(className)) {
      setClasses(classes.filter((c) => c !== className));
    } else {
      setClasses((prev) => [...prev, className]);
    }
  };

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

  const getAxiePurity = (axie) => {
    const genes = new AxieGene(axie.genes);
    const genesArray = [
      genes.mouth,
      genes.eyes,
      genes.ears,
      genes.horn,
      genes.back,
      genes.tail,
    ];
    var purity = 100;
    for (let gene of genesArray) {
      if (gene.d.cls.toLowerCase() !== axie.class.toLowerCase())
        purity = purity - 12.5;
      if (gene.r1.cls.toLowerCase() !== axie.class.toLowerCase())
        purity = purity - 3.125;
      if (gene.r2.cls.toLowerCase() !== axie.class.toLowerCase())
        purity = purity - 1.0416;
    }
    return Math.round(purity);
  };

  const formatAxie = (axie) => {
    const genes = new AxieGene(axie.genes);
    const purity = getAxiePurity(axie);
    const energy = axie.parts.reduce(
      (a, b) => a + b.abilities.reduce((x, y) => x + y.energy, 0),
      0
    );
    const attack = axie.parts.reduce(
      (a, b) => a + b.abilities.reduce((x, y) => x + y.attack, 0),
      0
    );
    const defense = axie.parts.reduce(
      (a, b) => a + b.abilities.reduce((x, y) => x + y.defense, 0),
      0
    );
    const genesGroup = [
      genes.ears,
      genes.eyes,
      genes.back,
      genes.tail,
      genes.mouth,
      genes.horn,
    ];
    const dGenes = genesGroup.map((a) => a.d.partId);
    const r1Genes = genesGroup.map((a) => a.r1.partId);
    const r2Genes = genesGroup.map((a) => a.r2.partId);
    return {
      ...axie,
      genes,
      purity,
      energy,
      attack,
      defense,
      dGenes,
      r1Genes,
      r2Genes,
    };
  };

  const formatAxies = (data) => {
    return data.map((i) => formatAxie(i));
  };

  const getAxies = async () => {
    setAxies([]);
    setError(false);
    setLoading(true);
    let { data, error } = await fetchAxies(
      currentPage,
      dataPerPage,
      pagesAtOnce,
      advancedEnabled,
      sorting,
      classes,
      numMystic,
      pureness,
      hp,
      skill,
      speed,
      morale,
      breedCount,
      genesIncluded.map((gene) => gene.partId)
    );
    if (error) {
      setError("No Axies Found");
    } else {
      setAxies(formatAxies(data.results));
    }
    setLoading(false);
    setTotalAxies(data.total);
  };

  useEffect(() => {
    setBreedCount([0, 1, 2, 3, 4, 5, 6, 7].slice(0, maxBreed + 1));
  }, [maxBreed]);

  useEffect(() => {
    setNumMystic([0, 1, 2, 3, 4, 5, 6].slice(minMystic, 7));
  }, [minMystic]);

  useEffect(() => {
    setPureness([1, 2, 3, 4, 5, 6].slice(minPureness - 1, 6));
  }, [minPureness]);

  useEffect(() => {
    (async () => {
      setAxies([]);
      setError(false);
      setLoading(true);
      let { data, error } = await fetchAxies(
        currentPage,
        dataPerPage,
        pagesAtOnce,
        advancedEnabled,
        sorting,
        classes,
        numMystic,
        pureness,
        hp,
        skill,
        speed,
        morale,
        breedCount,
        genesIncluded.map((gene) => gene.partId)
      );
      if (error) {
        setError("No Axies Found");
      } else {
        setAxies(formatAxies(data.results));
      }
      setLoading(false);
      setTotalAxies(data.total);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    breedCount,
    classes,
    currentPage,
    dataPerPage,
    hp,
    morale,
    numMystic,
    pureness,
    skill,
    sorting,
    speed,
    pagesAtOnce,
  ]);

  useEffect(() => {
    setError(false);
    if (!advancedEnabled) setFilteredAxies(axies);
    else {
      const unfilteredAxies = [...axies];
      const battleFiltered = unfilteredAxies
        .filter((a) => a.energy <= maxEnergy && a.energy >= minEnergy)
        .filter((a) => a.attack >= minAttack)
        .filter((a) => a.defense >= minDefense);
      const excludeParts = battleFiltered.filter((a) => {
        for (let g of genesExcluded) {
          if (
            a.r1Genes.includes(g.partId) ||
            a.r2Genes.includes(g.partId) ||
            a.dGenes.includes(g.partId)
          ) {
            return false;
          }
        }
        return true;
      });
      const r1GeneFilter = excludeParts.filter((a) => {
        if (r1Genes.length === 0) return true;
        for (let g of r1Genes) {
          if (a.r1Genes.includes(g.partId)) {
            return true;
          }
        }
        return false;
      });
      const r2GeneFilter = r1GeneFilter.filter((a) => {
        if (r2Genes.length === 0) return true;
        for (let g of r2Genes) {
          if (a.r2Genes.includes(g.partId)) {
            return true;
          }
        }
        return false;
      });
      const purityFiltered = r2GeneFilter.filter((a) => a.purity >= minPurity);
      if (purityFiltered.length === 0) {
        setError("No Matching Axies on this page");
      }
      setFilteredAxies(purityFiltered);
    }
  }, [
    advancedEnabled,
    axies,
    genesExcluded,
    maxEnergy,
    minAttack,
    minDefense,
    minEnergy,
    minPurity,
    r1Genes,
    r2Genes,
  ]);

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
        genesIncluded,
        setGenesIncluded,
        genesExcluded,
        setGenesExcluded,
        r1Genes,
        setR1Genes,
        r2Genes,
        setR2Genes,
        axies,
        setAxies,
        loading,
        setLoading,
        error,
        setError,
        totalAxies,
        dataPerPage,
        setDataPerPage,
        sorting,
        setSorting,
        currentPage,
        setCurrentPage,
        getAxies,
        filteredAxies,
        setFilteredAxies,
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
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
