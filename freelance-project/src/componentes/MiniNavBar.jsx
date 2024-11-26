import { Link } from "react-router-dom";
import "./miniBar.css";
const MiniNavBar = () => {
  return (
    <nav className="miniBar">
      <div>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
      </div>
      <div>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
      </div>
    </nav>
  );
};

export default MiniNavBar;
