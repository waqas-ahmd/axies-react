import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiltersContext } from "../filtersContext";
import ArenaView from "./ArenaView";
import BasicView from "./BasicView";
import BreedProView from "./BreedProView";
import BreedView from "./BreedView";
import CompleteView from "./CompleteView";
import Loader from "./Loader";
import * as styles from "./MainPage.module.css";

const MainPage = () => {
  const [pageInputValue, setPageInputValue] = useState(1);
  const [view, setView] = useState(0);
  const navigate = useNavigate();

  const {
    loading,
    error,
    totalAxies,
    dataPerPage,
    setDataPerPage,
    setSorting,
    currentPage,
    setCurrentPage,
    getAxies,
    filteredAxies,
    advancedEnabled,
    pagesAtOnce,
  } = useContext(FiltersContext);

  const refetch = async () => {
    await getAxies();
  };

  useEffect(() => {
    currentPage === 1 ? navigate("/") : navigate(`/?page=${currentPage}`);
    setPageInputValue(currentPage);
  }, [currentPage, navigate]);
  return (
    <div className={styles.page}>
      <div className={styles.flexRow1}>
        <select onChange={(e) => setDataPerPage(+e.target.value)}>
          {[30, 40, 50, 60, 70, 80, 90].map((num, index) => (
            <option key={index} value={num}>
              {num} Axies/Page
            </option>
          ))}
        </select>

        <select onChange={(e) => setSorting(e.target.value)}>
          {[
            { value: "PriceAsc", label: "Lowest Price" },
            { value: "PriceDesc", label: "Highest Price" },
            { value: "Latest", label: "Latest" },
          ].map(({ value, label }, key) => (
            <option key={key} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.flexRow1}>
        <div className={styles.flexRow2}>
          <div onClick={refetch} className={styles.refreshButton}>
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <g fill="#fff">
                <path d="M10.319,4.936a7.239,7.239,0,0,1,7.1,2.252,1.25,1.25,0,1,0,1.872-1.657A9.737,9.737,0,0,0,9.743,2.5,10.269,10.269,0,0,0,2.378,9.61a.249.249,0,0,1-.271.178l-1.033-.13A.491.491,0,0,0,.6,9.877a.5.5,0,0,0-.019.526l2.476,4.342a.5.5,0,0,0,.373.248.43.43,0,0,0,.062,0,.5.5,0,0,0,.359-.152l3.477-3.593a.5.5,0,0,0-.3-.844L5.15,10.172a.25.25,0,0,1-.2-.333A7.7,7.7,0,0,1,10.319,4.936Z"></path>
                <path d="M23.406,14.1a.5.5,0,0,0,.015-.526l-2.5-4.329A.5.5,0,0,0,20.546,9a.489.489,0,0,0-.421.151l-3.456,3.614a.5.5,0,0,0,.3.842l1.848.221a.249.249,0,0,1,.183.117.253.253,0,0,1,.023.216,7.688,7.688,0,0,1-5.369,4.9,7.243,7.243,0,0,1-7.1-2.253,1.25,1.25,0,1,0-1.872,1.656,9.74,9.74,0,0,0,9.549,3.03,10.261,10.261,0,0,0,7.369-7.12.251.251,0,0,1,.27-.179l1.058.127a.422.422,0,0,0,.06,0A.5.5,0,0,0,23.406,14.1Z"></path>
              </g>
            </svg>
          </div>
          <div>
            <span className={styles.totalNumber}>{totalAxies}</span>
            <span> Axies Found</span>
          </div>
        </div>

        <select onChange={(e) => setView(+e.target.value)}>
          <option value={0}>Basic View</option>
          <option value={1}>Arena View</option>
          <option value={2}>Breed View</option>
          <option value={3}>Breed Pro View</option>
          <option value={4}>Complete View</option>
        </select>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : null}

      <div className={styles.cardsGrid}>
        {filteredAxies.map((axie, index) => (
          <div key={index} className={styles.cardContainer}>
            {view === 0 && <BasicView data={axie} />}
            {view === 1 && <ArenaView data={axie} />}
            {view === 2 && <BreedView data={axie} />}
            {view === 3 && <BreedProView data={axie} />}
            {view === 4 && <CompleteView data={axie} />}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
          className={styles.prev}
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            ></path>
          </svg>
        </button>
        <div>Page</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(pageInputValue);
          }}
        >
          <input
            onChange={(e) => setPageInputValue(+e.target.value)}
            value={pageInputValue}
            max={Math.round(
              totalAxies / dataPerPage / (advancedEnabled ? pagesAtOnce : 1)
            )}
          />
        </form>
        <div>
          of{" "}
          {Math.round(
            totalAxies / dataPerPage / (advancedEnabled ? pagesAtOnce : 1)
          )}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={styles.next}
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
