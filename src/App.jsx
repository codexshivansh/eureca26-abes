import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Tracks from "./components/Tracks";
import Rewards from "./components/Rewards";
import FAQ from "./components/FAQ";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Timeline />
        <Tracks />
        <Rewards />
        <RegisterForm />
        <FAQ />
      </main>
      <Footer />
      <div className="mobile-cta">
        <a href="#register" className="btn btn-primary">
          Register Team →
        </a>
      </div>
    </>
  );
}

export default App;
