import "./App.css";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import PricingTable from "./Pricing-Table";
import AnimatedCard from "./animatedCard";

function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <AnimatedCard />
      <PricingTable />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
