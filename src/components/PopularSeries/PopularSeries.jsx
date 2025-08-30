import React from "react";
import MediaCard from "../card/Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import SquareLoader from "react-spinners/esm/SquareLoader";
const PopularSeries = () => {
  // get poplar series=================================================
  function getPopularSeries() {
    return axios.get("https://api.themoviedb.org/3/tv/popular", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzY1NjZiOTZiZjNmMzM2NzIyYzMxY2UzYTMxZjAzNiIsIm5iZiI6MTc1NDMwMjgzMS44MSwic3ViIjoiNjg5MDg5NmYwOGZkOTRiYjYwMjYxY2Y3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XYIerzCP_S-CztiqRVDN0RhKH599eR25ajoI_E7TPiA",
      },
    });
  }
  // cash data====================================================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popularSeries"],
    queryFn: getPopularSeries,
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
    <div>
      <section>
        <section className="container mx-auto px-5">
          <h2 className="my-7 capitalize  relative text-[1.3rem] after:absolute after:bg-light after:w-full after:h-[2px] after:bottom-[-10px] after:left-0">
            popular series
          </h2>

          <MediaCard check={true} results={data?.data?.results} />
        </section>
      </section>
    </div>
  );
};

export default PopularSeries;
