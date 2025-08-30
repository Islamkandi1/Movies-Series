import React, { useContext, useEffect, useState } from "react";
import Searsh from "../../searsh/Searsh";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MediaCard from "./../../card/Card";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import SquareLoader from "react-spinners/esm/SquareLoader";
import MyPagination from "../../common/pagination/MyPagination";
import { searchContext } from "../../../context/SearchContext";
const Allmovies = () => {
  const [page, setPage] = useState(1);
  const { searchData, setSearchDate } = useContext(searchContext);

  // reset page=================
  useEffect(() => {
    return () => setSearchDate([]);
  }, []);
  // handle page========================================================

  function handlePage(_, value) {
    setPage(value);
  }
  // get movies======================================================================
  function getAllMovies() {
    return axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=f36566b96bf3f336722c31ce3a31f036&page=${page}`
    );
  }
  // cash data====================================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allMovies", page],
    queryFn: getAllMovies,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="text-[#00000042] z-9">
        <div className=" flex items-center justify-center min-h-dvh">
          <SquareLoader color={"red"} />
        </div>
      </div>
    );
  }
  if (isError) {
    toast.error(error.message);
  }

  return (
    <>
      <section className="container mx-auto  px-5 pt-[4rem]">
        <Searsh param={"movie"} />
        <MediaCard
          results={searchData?.length == 0 ? data?.data?.results : searchData}
        />
        {searchData.length == 0 && (
          <section>
            <MyPagination
              page={page}
              totalPages={210}
              handlePage={handlePage}
            />
          </section>
        )}
      </section>
       <title>Netflix/movies</title>
    </>
  );
};

export default Allmovies;
