import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <Link to="/stories">Your stories</Link>
              <Link to="/bookmarks">Your bookmarks</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
export default Layout;
