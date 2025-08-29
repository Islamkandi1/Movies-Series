import React, { useContext, useEffect, useState } from "react";
import Searsh from "../../searsh/Searsh";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MediaCard from "./../../card/Card";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import SquareLoader from "react-spinners/esm/SquareLoader";
import MyPagination from "../../common/pagination/MyPagination";
import { searchContextSeries } from "../../../context/SearchContextSeries";
const Series = () => {
  const [page, setPage] = useState(1);
  const { searchDataSeries,setSearchDateSeries } = useContext(searchContextSeries);
  
  // reset page=================
  useEffect(() => {
    return () => setSearchDateSeries([]);
  }, []);
  // handle page========================================================
  function handlePage(_, value) {
    setPage(value);
  }
  // get movies======================================================================
  function getAllSeries() {
    return axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=f36566b96bf3f336722c31ce3a31f036&page=${page}`
    );
  }
  // cash data====================================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["series", page],
    queryFn: getAllSeries,
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
      <section className="containe mx-auto px-7 pt-[4rem]">
        <Searsh param={"tv"} />
        <MediaCard
          results={
            searchDataSeries.length == 0
              ? data?.data?.results
              : searchDataSeries
          }
        />
        <section>
          {searchDataSeries.length == 0 && (
            <MyPagination
              page={page}
              totalPages={203707}
              handlePage={handlePage}
            />
          )}
        </section>
      </section>
        <title>Netflix/tv-series</title>
    </>
  );
};

export default Series;
