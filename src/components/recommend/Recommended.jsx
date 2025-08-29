import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import SquareLoader from "react-spinners/esm/SquareLoader";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import MediaCard from "../card/Card";
const Recommended = ({ id, type }) => {
  function getRecommended() {
    if (type.includes("movie")) {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=f36566b96bf3f336722c31ce3a31f036`
      );
    } else {
      return axios.get(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=f36566b96bf3f336722c31ce3a31f036`
      );
    }
  }

  //   handle cashing=========================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommended", id],
    queryFn: getRecommended,
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
      <section className="container mx-auto px-7">
        <h2 className="my-7 capitalize  relative text-[1.3rem] after:absolute after:bg-light after:w-full after:h-[2px] after:bottom-[-10px] after:left-0">
          you might like
        </h2>
        <MediaCard results={data?.data.results} />
      </section>
    </>
  );
};

export default Recommended;
