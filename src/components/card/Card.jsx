import React, { useContext } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { favoriteContext } from "../../context/AddToFavorite";
import { ChangeIconContext } from "../../context/ChangeIcon";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { removeContext } from "./../../context/RemoveFromFavorite";
import noImage from "./../../assets/images/no-image.svg";
function MediaCard({ results, check }) {
  const { mutate } = useContext(favoriteContext);
  const { icon, setIcon } = useContext(ChangeIconContext);
  const { mutate: remove } = useContext(removeContext);
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[3rem] ">
        {(check ? results?.slice(0, 8) : results)?.map((movie) => (
          <section className="relative " key={movie.id}>
            <Link
              key={movie.id}
              to={`/details/${movie.name ? "series" : "movie"}/${movie.id}`}
              className="rounded-[10px] overflow-hidden decoration-0 group "
            >
              <section className="bg-[#141414] h-full flex flex-col">
                <figure className="relative">
                  <div className="layer absolute opacity-0 transition-all duration-300 inset-0 group-hover:opacity-100 bg-[#00000068] flex justify-center items-center">
                    <p className="text-[1.4rem] text-main">
                      <FaPlay />
                    </p>
                  </div>
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                        : noImage
                    }
                    className="w-full h-[200px] object-cover"
                  />
                </figure>
                <section className="p-3 flex grow flex-col">
                  <h2 className="text-light text-[1.4rem] mb-2 group-hover:text-main transition-all duration-300">
                    {movie.title ? movie.title : movie.name}
                  </h2>
                  <section className="flex items-center grow justify-between group-hover:text-main transition-all duration-300">
                    <p>
                      {movie.release_date
                        ? movie.release_date
                        : movie.first_air_date}
                    </p>
                    <p className="bg-[#3A2C2A] text-[#F8CC30] rounded-[8px] p-1 flex items-center gap-1">
                      <span className="text-[1.1rem]">
                        <TiStarFullOutline />
                      </span>
                      <span>
                        {movie.vote_average.toString().split("", 3).join(" ")}
                      </span>
                    </p>
                  </section>
                </section>
              </section>
            </Link>

            <p className="text-light cursor-pointer absolute top-[10px] z-50 right-[10px] text-[1.8rem] hover:text-main transition-all duration-300">
              {!icon.includes(movie.id) ? (
                <span>
                  <FaHeartCirclePlus
                    onClick={() => {
                      setIcon((prev) => [...prev, movie.id]),
                        mutate({
                          mediaId: movie.id,
                          mediaType: movie.name ? "tv" : "movie",
                        });
                    }}
                  />
                </span>
              ) : (
                <span>
                  <FaHeartCircleMinus
                    className="text-main"
                    onClick={() => {
                      remove({
                        mediaId: movie.id,
                        mediaType: movie.name ? "tv" : "movie",
                      });
                      setIcon(icon.filter((id) => +id !== movie.id));
                    }}
                  />
                </span>
              )}
            </p>
          </section>
        ))}
      </section>
    </>
  );
}
export default React.memo(MediaCard);
