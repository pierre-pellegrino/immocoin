import cn from "classnames";
import { useState } from "react";
import { hamburger, icon, top, middle, bottom, active } from "./hamburger.module.scss";
import HamburgerMenu from "./hamburger_menu";

const Hamburger = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleClick = () => {
    setMenuOpened((previous) => !previous);
  }

  return (
    <div className={hamburger}>
      <svg
        x="0"
        y="0"
        viewBox="0 0 96 96"
        strokeWidth={7}
        strokeLinecap="round"
        strokeMiterlimit={10}
        className={`${icon} ` + cn({
          [active]: menuOpened,
        })}
        onClick={handleClick}
      >
        <line className={top} x1="4" y1="12" x2="92" y2="12" />
        <line className={middle} x1="4" y1="48" x2="92" y2="48" />
        <line className={bottom} x1="4" y1="84" x2="92" y2="84" />
      </svg>
      <HamburgerMenu menuOpened={menuOpened} />
    </div>
  );
};

export default Hamburger;
