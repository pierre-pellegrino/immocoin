import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import {
  navItems,
  menu,
  profilePictureWrapper,
  profilePicture,
  profile,
  active,
} from "./hamburger_menu.module.scss";

const HamburgerMenu = ({ connected, menuOpened }) => {
  let content = (
    <>
      <li>
        <Link href="/login">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M 6.5625 5.0136719 C 2.4595703 5.2668613 -0.68726562 9.0536406 0.13085938 13.369141 C 0.65285938 16.124141 2.8748594 18.347141 5.6308594 18.869141 C 9.378008 19.579519 12.720128 17.298793 13.703125 14 L 18 14 L 18 15 C 18 16.105 18.895 17 20 17 C 21.105 17 22 16.105 22 15 L 22 14 C 23.105 14 24 13.105 24 12 C 24 10.895 23.105 10 22 10 L 13.699219 10 C 12.979424 7.5432523 10.909496 5.6120152 8.3691406 5.1308594 C 7.7527656 5.0139844 7.1486328 4.977502 6.5625 5.0136719 z M 7 9 C 8.657 9 10 10.343 10 12 C 10 13.657 8.657 15 7 15 C 5.343 15 4 13.657 4 12 C 4 10.343 5.343 9 7 9 z"></path>
            </svg>
            Me connecter
          </a>
        </Link>
      </li>
      <li>
        <Link href="/register">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
            </svg>
            M&apos;inscrire
          </a>
        </Link>
      </li>
    </>
  );

  if (connected) {
    content = (
      <>
        <li className={profile}>
          <div className={profilePictureWrapper}>
            <Image
              src="/default_avatar.svg"
              width="96"
              height="96"
              alt="profile picture"
              className={profilePicture}
            />
          </div>
          <div>Mon&nbsp;Profil</div>
        </li>
        <hr />
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
          </svg>
          Créer une annonce
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
          </svg>
          Me déconnecter
        </li>
      </>
    );
  }

  return (
    <nav
      className={
        `${menu} ` +
        cn({
          [active]: menuOpened,
        })
      }
    >
      <ul className={navItems}>{content}</ul>
    </nav>
  );
};

export default HamburgerMenu;
