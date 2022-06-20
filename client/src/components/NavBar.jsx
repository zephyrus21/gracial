import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  let activeStyle = {
    color: "red",
  };

  return (
    <nav>
      {user ? (
        <>
          <NavLink
            to='/'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Welcome {user.username}
          </NavLink>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
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
        </>
      )}
    </nav>
  );
};

export default NavBar;
