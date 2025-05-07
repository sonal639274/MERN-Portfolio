import React from "react";
import Hero from "./miniComponents/Hero";
import Skills from "./miniComponents/Skills";
import About from "./miniComponents/About";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import ClientProject from "./miniComponents/ClientProject";

const Home = () => {
  return (
    <>
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero />
      {/* <Timeline /> */}
      <About />
      <Skills />
      <ClientProject />
      <Portfolio />
      <Contact />
    </article>
    </>
  );
};

export default Home;
