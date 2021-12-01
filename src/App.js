import "./App.css";
import FilterSection from "./components/FilterSection";
import MainPage from "./components/MainPage";
import * as styles from "./App.module.css";
import { FiltersProvider } from "./filtersContext";
import useWindowSize from "./hooks/useWindowSize";
import { useState } from "react";

function App() {
  const { width } = useWindowSize();
  const [showFilters, setShowFilters] = useState(false);
  return (
    <FiltersProvider>
      <div className="App">
        <div className={width > 700 ? styles.desktopPage : styles.mobilePage}>
          {width < 700 ? (
            <div className={styles.filterNav}>
              <div className={styles.left}>
                <div className={styles.filterIcon}>{filtersIcon}</div>
                <h2>Filters</h2>
              </div>
              <div
                onClick={() => setShowFilters((a) => !a)}
                className={styles.switchIcon}
              >
                <svg
                  className={showFilters && styles.rotate}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : null}
          {width < 700 && !showFilters ? null : (
            <div className={styles.filtersContainer}>
              <div className={styles.pageScroller}>
                <FilterSection />
              </div>
            </div>
          )}

          <div className={styles.pageContainer}>
            <div className={styles.pageScroller}>
              <MainPage />
            </div>
          </div>
        </div>
      </div>
    </FiltersProvider>
  );
}

const filtersIcon = (
  <svg viewBox="0 0 512 512">
    <path
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M368 128h80m-384 0h240m64 256h80m-384 0h240m-96-128h240m-384 0h80"
    />
    <circle
      cx={336}
      cy={128}
      r={32}
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <circle
      cx={176}
      cy={256}
      r={32}
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <circle
      cx={336}
      cy={384}
      r={32}
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </svg>
);

export default App;
