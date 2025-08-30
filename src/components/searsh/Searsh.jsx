import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { searchContext } from "../../context/SearchContext";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import { useLocation } from "react-router-dom";
import { searchContextSeries } from "./../../context/SearchContextSeries";
const Searsh = ({ param }) => {
  const { register, handleSubmit } = useForm();
  const { setSearchDate } = useContext(searchContext);
  const { setSearchDateSeries } = useContext(searchContextSeries);
  const { pathname } = useLocation();
  
  
  function search({ content }) {
    return axios.get(
      `https://api.themoviedb.org/3/search/${param}?api_key=f36566b96bf3f336722c31ce3a31f036&query=${content}
      `
    );
  }
   
  const { mutate } = useMutation({
    mutationFn: search,
    onSuccess: (data) => {
      if (pathname.includes("allMovies")) {
        setSearchDate(data?.data?.results);
        
      } else {
        setSearchDateSeries(data?.data?.results);
      }
    },
    onError: () => toast.error("some thing went wrong"),
  });

  return (
    <>
      <section className="pt-[.5rem] bg-[#141414] p-[2rem] text-center">
        <h2 className="text-[1.5rem] md:text-[1.8rem] lg:text-[2rem] mb-4 text-main capitalize tracking-[1px] ">
          Welcome to netflix
        </h2>
        <p className="capitalize text-[1.1rem] max-w-[350px] mb-4 md:max-w-[450px] mx-auto">
          Discover millions of movies, TV shows and people. Start exploring now!
        </p>
        <form className="input flex flex-wrap gap-4" onSubmit={handleSubmit(mutate)}>
          <input
            type="searsh"
            placeholder="search and explore...."
            className="grow bg-light text-dark border-0 outline-0 px-4 py-3 rounded-xl "
            {...register("content")}
          />
          <button
            type="submit"
            className="bg-main px-4 py-3 rounded-[8px] tracking-wide capitalize text-light cursor-pointer"
          >
            search
          </button>
        </form>
      </section>
    </>
  );
};

export default Searsh;
