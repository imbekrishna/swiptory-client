import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ fontSize: "2rem" }}>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="http://localhost:5173/story/66255eeec2315b0dc5928fd6">
            Go to story
          </Link>
        </li>
        <li>
          <Link to="auth">Login</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
