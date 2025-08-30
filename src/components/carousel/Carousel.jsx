// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
// import required modules
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SquareLoader from "./../../../node_modules/react-spinners/esm/SquareLoader";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import { TiStarFullOutline } from "react-icons/ti";
import Button from "../common/Button/Button";
export default function Carousel() {

  // get some movies on carousel============================
  function getSomeMovies() {
    return axios.get("https://api.themoviedb.org/3/movie/now_playing", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzY1NjZiOTZiZjNmMzM2NzIyYzMxY2UzYTMxZjAzNiIsIm5iZiI6MTc1NDMwMjgzMS44MSwic3ViIjoiNjg5MDg5NmYwOGZkOTRiYjYwMjYxY2Y3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XYIerzCP_S-CztiqRVDN0RhKH599eR25ajoI_E7TPiA",
      },
    });
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["somePosts"],
    queryFn: getSomeMovies,
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
    console.log(error);
    toast.error(error.message);
  }

  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwipe h-[90vh] md:min-h-dvh"
      >
        {data?.data?.results.slice(0, 4).map((movie) => (
          <SwiperSlide key={movie.id}>
            <section
              style={{
                backgroundImage: `linear-gradient(to top ,rgba(0,0,0,.8) ,rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <section className="container flex items-center h-[90vh] md:min-h-dvh md:min-h-dvh px-7 mx-auto">
                <section className="content">
                  <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] capitalize mb-3 font-semibold ">
                    {movie.title}
                  </h2>
                  <section className="mb-4 flex  items-center gap-3">
                    <p className="text-[#dfdfdf] text-[1.1rem] ">
                      {movie.release_date.split("", 4)}
                    </p>
                    <p className="bg-[#3A2C2A] text-[#F8CC30] rounded-[8px] p-1 flex items-center gap-1">
                     <span className="text-[1.1rem]"><TiStarFullOutline /></span> 
                      {movie.vote_average.toString().split("", 3).join("")}
                    </p>
                  </section>
                  <p className="text-[1.3rem] xl:text-[1.3rem]  text-[#dfdfdf]   max-w-[470px] md:max-w-[650px] mb-7 lg:mb-[1.8rem]">
                    {movie.overview.split(" ", 30).join(" ")}
                  </p>
                  <section className="flex gap-5 ">
                   <Button type={"movie"} id={movie.id}/>
                  </section>
                </section>
              </section>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
