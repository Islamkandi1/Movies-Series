import React, { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { favoriteContext } from "../../../context/AddToFavorite";
import { ChangeIconContext } from "../../../context/ChangeIcon";
import { removeContext } from "../../../context/RemoveFromFavorite";
const Button = ({ id, type }) => {
  const { mutate } = useContext(favoriteContext);
  const { icon, setIcon } = useContext(ChangeIconContext);
  const { mutate: remove } = useContext(removeContext);
  // handle button===============================
  function handleButton(boolean) {
    if (boolean) {
      mutate({
        mediaId: id,
        mediaType: type == "movie" ? "movie" : "tv",
      });
      setIcon((prev) => [...prev, +id]);
    } else {
      setIcon((prev) => prev.filter((item) => +item !== +id));
      remove({ mediaId: id, mediaType: type == "movie" ? "movie" : "tv" });
    }
  }
  return (
    <div>
      {icon.includes(+id) ? (
        <button
          type="button"
          onClick={() => handleButton(false)}
          className="bg-main     capitalize px-4 py-3 rounded-[10px] cursor-pointer flex  items-center gap-2"
        >
          <span className="text-[1.2rem]">
            <CiHeart />
          </span>
          remove from favorite
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handleButton(true)}
          className="bg-[#0D0D0D] hover:bg-[#1F1F1F] transition-all duration-300  border-[1px] border-gray-500  capitalize px-4 py-3 rounded-[10px] cursor-pointer flex  items-center gap-2"
        >
          <span className="text-[1.2rem]">
            <CiHeart />
          </span>
          add to favorite
        </button>
      )}
    </div>
  );
};

export default Button;
