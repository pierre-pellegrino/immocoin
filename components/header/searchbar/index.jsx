import { searchContainer, search } from "./searchbar.module.scss";

const Searchbar = () => {
  return (
    <div className={searchContainer}>
      <label htmlFor="searchBar">
        <svg
          aria-label="search-icon"
          color="#8e8e8e"
          fill="#8e8e8e"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path
            d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="16.511"
            x2="22"
            y1="16.511"
            y2="22"
          ></line>
        </svg>
      </label>
      <input type="text" placeholder="Rechercher" id="searchBar" className={search} />
    </div>
  );
};

export default Searchbar;
