import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import userAvatar from "../../assets/avatar.svg";
import bookmarkIcon from "../../assets/bookmark.svg";
import closeIcon from "../../assets/close.svg";
import hamburgerIcon from "../../assets/hamburger.svg";
import { useState } from "react";

const NavBar = () => {
  // const { user, removeUser } = useContext(UserContext);
  // const { toggleAuthForm, toggleStoryForm } = useContext(FormContext);

  const [user] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const toggleNav = () => setNavIsOpen((open) => !open);
  const toggleProfile = () => setProfileIsOpen((open) => !open);

  const closeNav = () => setNavIsOpen(false);

  const logout = () => {
    setProfileIsOpen(false);
    // removeUser();
  };

  const AuthComponent = () => (
    <>
      <button
        className="bgPrimary textLight"
        onClick={() => {
          closeNav();
          //  toggleAuthForm("REGISTER");
        }}
      >
        Register
      </button>
      <button
        className="bgSecondary textLight"
        onClick={() => {
          closeNav();
          //  toggleAuthForm("LOGIN");
        }}
      >
        Log in
      </button>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <Link to="/">
          <h1>SwipTory</h1>
        </Link>
        <img src={hamburgerIcon} alt="" role="button" onClick={toggleNav} />
      </div>
      <nav className={clsx(styles.mobileNav, navIsOpen && styles.flex)}>
        {user && (
          <img
            className={styles.userAvatar}
            src={userAvatar}
            width="48px"
            alt=""
          />
        )}
        <img
          className={styles.navCloseBtn}
          src={closeIcon}
          alt=""
          role="button"
          onClick={closeNav}
        />{" "}
        {!user ? (
          <AuthComponent />
        ) : (
          <>
            <p className={styles.username}>{user.username}</p>
            <Link to="/user/stories">
              <button className="bgPrimary textLight">Your Stories</button>
            </Link>
            <button
              className="bgPrimary textLight"
              onClick={() => {
                closeNav();
                // toggleStoryForm("NEW");
              }}
            >
              Add Story
            </button>
            <Link to="/user/bookmarks">
              <button
                className={clsx("bgPrimary", "textLight", styles.iconButton)}
              >
                <img src={bookmarkIcon} width="16px" height="16px" alt="" />{" "}
                <span>Bookmarks</span>
              </button>
            </Link>
            <button className="bgPrimary textLight" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
      <nav className={styles.desktopNav}>
        {user ? (
          <>
            <Link to="/user/bookmarks">
              <button
                className={clsx("bgPrimary", "textLight", styles.iconButton)}
              >
                <img src={bookmarkIcon} width="16px" height="16px" alt="" />{" "}
                <span>Bookmarks</span>
              </button>
            </Link>
            <button
              className="bgPrimary textLight"
              onClick={() => {
                closeNav();
                // toggleStoryForm("NEW");
              }}
            >
              Add Story
            </button>
            <img src={userAvatar} width="48px" alt="" />
            <img
              src={hamburgerIcon}
              alt=""
              role="button"
              onClick={toggleProfile}
            />
          </>
        ) : (
          <AuthComponent />
        )}
        <div
          className={clsx(styles.profileCard, profileIsOpen ? styles.grid : "")}
        >
          <p>Bal Krishna Mehata</p>
          <button className="bgPrimary textLight" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
