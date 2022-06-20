import { NavLink } from "react-router-dom";

const NavBar = () => {
  let activeStyle = {
    color: "red",
  };

  return (
    <nav>
      <NavLink
        to='/'
        style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Home
      </NavLink>
      <NavLink
        to='/register'
        style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Register
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to='/login'>
        Login
      </NavLink>
    </nav>
  );
};

export default NavBar;
