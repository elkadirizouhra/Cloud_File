import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accueil } from "./Componenents/LindingPage/indetx";
import SignIn from "./Componenents/SignIn";
import PricingTable from "./Componenents/LindingPage/Pricing-Table";
import SignUp from "./Componenents/SignUp";
import Dashboard from "./Componenents/dashboard";
import Profile from "./Componenents/updateProfile";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Accueil />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/userProfile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
