import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Home,
  Accueil,
  Footer,
  Navbar,
  Contact,
  About,
  Work,
} from "./Componenents/LindingPage";
import SignIn from "./Componenents/SignIn";
import PricingTable from "./Componenents/LindingPage/Pricing-Table";
import SignUp from "./Componenents/SignUp";
import Dashboard from "./Componenents/dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Accueil />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default App;
