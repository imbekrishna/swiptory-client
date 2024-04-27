import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="http://localhost:5173/story/66255eeec2315b0dc5928fd6">
        Go to story
      </Link>
    </div>
  );
};
export default Home;
