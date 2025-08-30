import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SquareLoader from "react-spinners/esm/SquareLoader";
import toast from "./../../../../node_modules/react-hot-toast/src/index";
import { TbRating18Plus } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { FaPlay, FaRegClock } from "react-icons/fa6";
import Button from "./../../common/Button/Button";
import Cast from "../../cast/Cast";
import Recommended from "./../../recommend/Recommended";
import { FaArrowLeft } from "react-icons/fa";
const Details = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  // get details of movie or series=====================================
  function getDetails() {
    if (type.includes("movie")) {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f36566b96bf3f336722c31ce3a31f036`
      );
    } else {
      return axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=f36566b96bf3f336722c31ce3a31f036`
      );
    }
  }
  //   handle cashing=========================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["datails", id],
    queryFn: getDetails,
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

  function convertMinutes() {
    let hours = Math.floor(data?.data.runtime / 60);
    let minutes = data?.data.runtime % 60;
    return `${hours}h ${minutes}m`;
  }
  const hours = convertMinutes();

  // get back page===========================================
  function back() {
    navigate(-1);
  }
  return (
    <>
      <section
        className="min-h-dvh pt-[6rem] lg:pt-[1rem]"
        style={{
          backgroundImage: `linear-gradient(to top ,rgba(0,0,0,.8) ,rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500/${data?.data.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="container mx-auto px-5 min-h-dvh flex items-center  relative">
          <button
            type="button"
            onClick={back}
            className="absolute top-[-20px] lg:top-[6 0px]  bg-[#0D0D0D] hover:bg-[#1F1F1F] transition-all duration-300  border-[1px] border-gray-500  capitalize px-4 py-2 rounded-[10px] cursor-pointer flex  items-center gap-2"
          >
            <span>
              <FaArrowLeft />
            </span>
            back
          </button>
          <section className="flex flex-wrap gap-6 items-center mt-9">
            <figure className="relative">
              {data?.data.adults && (
                <div className="text-main absolute top-[-10px] right-[-15px] text-[2.3rem]">
                  <TbRating18Plus />
                </div>
              )}
              <img
                className="w-[300px] object-cover h-[400px] rounded-2xl shadow-2xl"
                src={`https://image.tmdb.org/t/p/w500/${data?.data.poster_path}`}
                alt=""
              />
            </figure>
            <section>
              <section className="head max-w-fit mb-4">
                <h2 className="text-[1.9rem] lg:text-[2.2rem] capitalize mb-1 max-w-[470px] mx-auto">
                  {data?.data.title ? data?.data.title : data?.data.name}
                </h2>
                {data?.data.tagline && (
                  <h3 className="text-center text-[1.3rem]  text-[#cdcccc] capitalize max-w-[400px]">
                    "{data?.data.tagline}"
                  </h3>
                )}
              </section>
              <section className="flex items-center gap-7 mb-5">
                <p className="text-[1.1rem] text-gray-400 m-0 flex items-center gap-1">
                  <span className="text-[1.2rem]">
                    <MdDateRange />
                  </span>
                  <span>
                    {data?.data.release_date
                      ? data?.data.release_date.split("", 4).join("")
                      : data?.data.last_air_date.split("", 4).join("")}
                  </span>
                </p>

                {data?.data.runtime && (
                  <p className="text-[1.1rem] text-gray-400 m-0 flex items-center gap-1">
                    <span className="text-[1.2rem]">
                      <FaRegClock />
                    </span>
                    <span>{hours}</span>
                  </p>
                )}

                <p className="bg-[#3A2C2A] text-[#F8CC30] w-fit rounded-[8px] p-1 flex items-center gap-1">
                  <span className="text-[1.1rem]">
                    <TiStarFullOutline />
                  </span>
                  <span>
                    {data?.data.vote_average.toString().split("", 3).join("")}
                  </span>
                </p>
              </section>
              <section className="flex items-center gap-3 max-w-[400px] flex-wrap mb-[1.5rem]">
                {data?.data.genres.map((genres) => (
                  <div
                    key={genres.id}
                    className="bg-[#141414] border border-gray-500 px-3 py-2 capitalize text-[1rem] rounded-2xl"
                  >
                    {genres.name}
                  </div>
                ))}
              </section>
              <p className="max-w-[530px] text-gray-300 md:max-w-[600px] text-[1.1rem] mb-5">
                {data?.data.overview}
              </p>

              <section className="flex items-center gap-4 pb-7 lg:pb-0">
                {data?.data.imdb_id && (
                  <button type="button">
                    <a
                      href={`https://www.imdb.com/title/${data?.data.imdb_id}`}
                      target="_blank"
                      className="flex items-center capitalize px-4 py-2 text-[1.1rem] rounded-[10px] bg-main  gap-2 cursor-pointer hover:bg-[#dc3030] transition-all duration-300"
                    >
                      <FaPlay /> watch now
                    </a>
                  </button>
                )}
                <Button type={type} id={id} />
              </section>
            </section>
          </section>
        </section>
      </section>
      <Cast id={id} type={type} />
      <Recommended id={id} type={type} />
      <title>Netflix/details </title>
    </>
  );
};

export default Details;
