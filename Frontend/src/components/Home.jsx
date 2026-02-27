import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;