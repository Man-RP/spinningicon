import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Cards from "../components/HomePage/Cards";
import Footer from "../components/HomePage/Footer";
import Hero from "../components/HomePage/Hero";
import NavBar from "../components/HomePage/NavBar";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <main>
        {/* <Hero /> */}
        <Cards />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
