import React from "react";
import Carousel from "./../../carousel/Carousel";
import MediaCard from "../../card/Card";
import PopularSeries from "../../PopularSeries/PopularSeries";
import PopularMovies from "../../popularMovies/PopularMovies";
const Home = () => {
  return (
    <>
      <Carousel />
      <PopularMovies />
      <PopularSeries />
      <title>Netflix</title>
    </>
  );
};

export default Home;
