import React from "react";
import CardCast from "../cardCast/CardCast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "././../../../node_modules/react-hot-toast/src/index";
import SquareLoader from "react-spinners/esm/SquareLoader";
const Cast = ({ id, type }) => {
  function getCast() {
    if (type.includes("movie")) {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f36566b96bf3f336722c31ce3a31f036`
      );
    } else {
      return axios.get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=f36566b96bf3f336722c31ce3a31f036`
      );
    }
  }

  //   handle cashing=========================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cast", id],
    queryFn: getCast,
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
          cast & crew
        </h2>
        <section className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-5">
            {data?.data.cast.slice(0,10).map(cast=>  <CardCast key={cast.id} cast={cast}/>)}
         
        </section>
      </section>
    </>
  );
};

export default Cast;
