import headerStyles from "./header.module.scss";

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <nav>
        <ul className={headerStyles.navItems}>
          <li className={headerStyles.title}>ImmoCoin</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
