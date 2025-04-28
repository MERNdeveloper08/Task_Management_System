import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h2>Task Management System</h2>
      <div className="right">
        <NavLink className="link" to="/">
          Home
        </NavLink>
        <NavLink className="link" to="/graph">
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
