import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layoute from "./components/layout/Layoute";
import Home from "./components/pages/Home/Home";
import Allmovies from "./components/pages/movies/Allmovies";
import Series from "./components/pages/series/Series";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import TopRatedMovies from "./components/pages/topRatedMovies/TopRatedMovies";
import TopRatedSeries from "./components/pages/topRatedSeries/TopRatedSeries";
import Details from "./components/pages/Details/Details";
import Favorite from "./components/pages/favotrite/Favorite";
import AddToFavorite from "./context/AddToFavorite";
import ChangeIcon from "./context/ChangeIcon";
import RemoveFromFavorite from "./context/RemoveFromFavorite";
import SearchContext from "./context/SearchContext";
import SearchContextSeries from "./context/SearchContextSeries";
const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layoute />,
      children: [
        { index: true, element: <Home /> },
        { path: "allMovies", element: <Allmovies /> },
        { path: "allSeries", element: <Series /> },
        { path: "topRatedMovies", element: <TopRatedMovies /> },
        { path: "topRatedSeries", element: <TopRatedSeries /> },
        { path: "favorite", element: <Favorite /> },
        { path: "details/:type/:id", element: <Details /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AddToFavorite>
        <RemoveFromFavorite>
          <ChangeIcon>
            <SearchContextSeries>
              <SearchContext>
                <RouterProvider router={router} />
              </SearchContext>
            </SearchContextSeries>
          </ChangeIcon>
        </RemoveFromFavorite>
      </AddToFavorite>
    </QueryClientProvider>
  );
};

export default App;
