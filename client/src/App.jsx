import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/auth";
import { Home, Login, Register } from "./pages";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <Register />}
        />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
