import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import MediaCard from "./../../card/Card";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import SquareLoader from "react-spinners/esm/SquareLoader";
import MyPagination from "../../common/pagination/MyPagination";

const TopRatedSeries = () => {
  const [page, setPage] = useState(1);
  // handle page========================================================

  function handlePage(_, value) {
    setPage(value);
  }
  // get movies======================================================================
  function getAllMovies() {
    return axios.get(
      `
https://api.themoviedb.org/3/tv/top_rated?page=${page}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzY1NjZiOTZiZjNmMzM2NzIyYzMxY2UzYTMxZjAzNiIsIm5iZiI6MTc1NDMwMjgzMS44MSwic3ViIjoiNjg5MDg5NmYwOGZkOTRiYjYwMjYxY2Y3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XYIerzCP_S-CztiqRVDN0RhKH599eR25ajoI_E7TPiA",
        },
      }
    );
  }
  // cash data====================================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRatedSeries", page],
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
      <section className="pt-[2rem] container mx-auto px-5">
        <MediaCard results={data?.data?.results} />
        <section>
          <MyPagination page={page} totalPages={114} handlePage={handlePage} />
        </section>
      </section>
       <title>Netflix/Top-Rated-series</title>
    </>
    
  );
};

export default TopRatedSeries;
