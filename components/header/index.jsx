import { header, nav, navItems, title, hamburger } from "./header.module.scss";
import Searchbar from "./searchbar";

const Header = () => {
  return (
    <header className={header}>
      <nav className={nav}>
        <ul className={navItems}>
          <li className={title}>ImmoCoin</li>
          <li><Searchbar /></li>
          <li className={hamburger}>Petit menu des familles</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
