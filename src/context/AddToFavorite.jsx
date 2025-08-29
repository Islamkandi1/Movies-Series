import React, { createContext } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "./../../node_modules/react-hot-toast/src/index";
export const favoriteContext = createContext();
const AddToFavorite = ({ children }) => {
  // Add to favorite===============================================
  function addFavorite({ mediaId, mediaType }) {
    const data = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: true,
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
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      toast.success("success");
      queryClient.invalidateQueries({
        queryKey: ["fav-movies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fav-series"],
      });
    },
    onError: () => {
      toast.success("some thing went wrong");
    },
  });

  const values = {
    mutate,
    isPending,
  };

  return (
    <favoriteContext.Provider value={values}>
      {children}
    </favoriteContext.Provider>
  );
};

export default AddToFavorite;
