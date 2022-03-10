import Link from "next/link";
import APIManager from "pages/api/axiosMethods";
import HamburgerIcon from "./hamburger";
import { header, nav, navItems, title, hamburger } from "./header.module.scss";
import Searchbar from "./searchbar";

const Header = ({ properties }) => {
  // console.log(properties);
  
  return (
    <header className={header}>
      <nav className={nav}>
        <ul className={navItems}>
          <li className={title}>
            <Link href="/">
              <a>ImmoCoin</a>
            </Link>
          </li>
          <li><Searchbar /></li>
          <li className={hamburger}>
            <HamburgerIcon />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
