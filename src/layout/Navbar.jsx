import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <NavLink to="/">
        <img src="./books.png" alt="book buddy logo" />
        <p>BookBuddy</p>
      </NavLink>
      <nav>
        <NavLink to="/books">Books</NavLink>

        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <a onClick={() => logout()}>Log out</a>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
