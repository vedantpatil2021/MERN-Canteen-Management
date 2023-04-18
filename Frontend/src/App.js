import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdditionalRoutes from "./AdditionalRoutes";
import CanteenLogin from "./auth/CanteenLogin";
import UserLogin from "./auth/UserLogin";
import Register from "./auth/Register";
import LandingPage from "./pages/LandingPage";
import { useState,createContext } from "react";
import { CartProvider } from "react-use-cart";

export const RoleContext = createContext();

function App() {
  const [isloggedIn, setIsLoggedIN] = useState(false);
  const [isSTUloggedIn, setIsSTULoggedIN] = useState(false);
  const [role, setRole] = useState("");
  const loginhandle = (data) => {
    setIsLoggedIN(data);
  };
  const loginSTUhandle = (data) => {
    setIsSTULoggedIN(data);
  };
  const STUrole = (data) => {
    setRole(data);
  };
  const CANrole = (data) => {
    setRole(data);
  };
  return (
    <div>
      <CartProvider>
        <RoleContext.Provider value={role}>
        {!isloggedIn && !isSTUloggedIn && (
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/canteenlogin"
                element={
                  <CanteenLogin loginHandle={loginhandle} CANrole={CANrole} />
                }
              />
              <Route
                path="/userlogin"
                element={
                  <UserLogin
                    loginSTUHandle={loginSTUhandle}
                    STUrole={STUrole}
                  />
                }
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        )}

        {isloggedIn && <AdditionalRoutes role={role} />}
        {isSTUloggedIn && <AdditionalRoutes role={role} />}
        </RoleContext.Provider>
      </CartProvider>
    </div>
  );
}

export default App;
