import React, { createContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "./../../node_modules/react-hot-toast/src/index";
import axios from "axios";
export const removeContext = createContext();
const RemoveFromFavorite = ({ children }) => {
  // remove from favorite================================================

  function removeFavorite({ mediaId, mediaType }) {
    const data = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: false,
    };
    return axios.post(
      "https://api.themoviedb.org/3/account/22198540/favorite",
      data,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzY1NjZiOTZiZjNmMzM2NzIyYzMxY2UzYTMxZjAzNiIsIm5iZiI6MTc1NDMwMjgzMS44MSwic3ViIjoiNjg5MDg5NmYwOGZkOTRiYjYwMjYxY2Y3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XYIerzCP_S-CztiqRVDN0RhKH599eR25ajoI_E7TPiA",
        },
      }
    );
  }
  const queryCLient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      toast.success("succes");
      queryCLient.invalidateQueries({
        queryKey: ["fav-movies"],
      });
      queryCLient.invalidateQueries({
        queryKey: ["fav-series"],
      });
    },
    onError: () => {
      toast.error("some thing went wrong ");
    },
  });


  const values = {
    mutate
  }
  return <removeContext.Provider value={values}>{children}</removeContext.Provider>;
};

export default RemoveFromFavorite;
