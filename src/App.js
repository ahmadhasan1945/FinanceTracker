import { BrowserRouter, Routes, Route, Redirect, Navigate  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./home/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./login/Login";
import Signup from "./signup/Signup";
function App() {
  // we use auth_is_ready to esure that our app doesn't load 
  //until an authentication of the user is ready either null(logged out) or logged in
  const { auth_is_ready, user } = useAuthContext()
  return (
    <div className="App">
      {(auth_is_ready && 
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
             path="/"
              element={!user ? (<Navigate replace to='/login' />) : (<Home />)} />
            <Route path="/signup" element={user ? (<Navigate replace to='/' />) : (<Signup />) } />
            <Route path="/login" element={user ? (<Navigate replace to='/' />) : (<Login />)} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
