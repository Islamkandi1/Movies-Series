import React from "react";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import SquareLoader from "react-spinners/esm/SquareLoader";
import MediaCard from "./../../card/Card";

const Favorite = () => {
  //get favorite movies==============================================================
  const fetchMovies = () =>
    axios.get("https://api.themoviedb.org/3/account/22198540/favorite/movies", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzY1NjZiOTZiZjNmMzM2NzIyYzMxY2UzYTMxZjAzNiIsIm5iZiI6MTc1NDMwMjgzMS44MSwic3ViIjoiNjg5MDg5NmYwOGZkOTRiYjYwMjYxY2Y3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XYIerzCP_S-CztiqRVDN0RhKH599eR25ajoI_E7TPiA",
      },
    });
  // get favorite tv show======================================================================
  const fetchSeries = () =>
    axios.get("https://api.themoviedb.org/3/account/22198540/favorite/tv", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzY1NjZiOTZiZjNmMzM2NzIyYzMxY2UzYTMxZjAzNiIsIm5iZiI6MTc1NDMwMjgzMS44MSwic3ViIjoiNjg5MDg5NmYwOGZkOTRiYjYwMjYxY2Y3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XYIerzCP_S-CztiqRVDN0RhKH599eR25ajoI_E7TPiA",
      },
    });
  // handle both api===================================================
  function useFavorites() {
    const movies = useQuery({ queryKey: ["fav-movies"], queryFn: fetchMovies });
    const series = useQuery({ queryKey: ["fav-series"], queryFn: fetchSeries });
    return { movies, series };
  }



  // concat all arrays-=======================================================================
  const { movies, series } = useFavorites();
  if (movies.isLoading || series.isLoading) {
    return (
      <div className="text-[#00000042] z-9">
        <div className=" flex items-center justify-center min-h-dvh">
          <SquareLoader color={"red"} />
        </div>
      </div>
    );
  }
  const allFavorites = [
    ...(movies.data?.data?.results || []),
    ...(series.data?.data?.results || []),
  ];
  console.log(allFavorites);

  return (
    <>
      <section className="pt-[2rem]">
        {movies.data.data.results.length == 0 &&
        series.data.data.results.length == 0 ? (
          <section className="text-light capitalize text-center pt-[3rem] ">
            <h2 className="text-[1.7rem] mb-4"> no favorite movies or series to watch</h2> 
            <p className="text-gray-400 text-[1.1rem]">"Start adding movies to your favorites to see them here!"</p>
          </section>
        ) : (
          <MediaCard results={allFavorites} />
        )}
      </section>
      <title>Netflix/favorite</title>
    </>
  );
};

export default Favorite;
