import "./App.css";
import FilterSection from "./components/FilterSection";
import MainPage from "./components/MainPage";
import * as styles from "./App.module.css";
import { FiltersProvider } from "./filtersContext";

function App() {
  return (
    <FiltersProvider>
      <div className="App">
        <div className={styles.page}>
          <div className={styles.filtersContainer}>
            <div className={styles.pageScroller}>
              <FilterSection />
            </div>
          </div>
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

export default App;
