import React from "react";
import noImage from "./../../assets/images/no-image.svg";
const CardCast = ({ cast }) => {

  return (
    <>
      <section className="bg-[#141414] h-full rounded-xl overflow-hidden">
        <figure>
          <img
            src={cast.profile_path ?`https://image.tmdb.org/t/p/w500/${cast.profile_path}` : noImage}
            className="w-full h-[250px] object-cover"
          />
        </figure>
        <section className="p-2 text-center">
          <h2 className="text-light text-[1.2rem]  mb-2  group-hover:text-main  transition-all duration-300">
            {cast.original_name}
          </h2>
          <p className="text-[.8rem] text-gray-300">{cast.character}</p>
        </section>
      </section>
    </>
  );
};

export default CardCast;
