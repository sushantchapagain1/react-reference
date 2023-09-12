import { useState, useEffect } from "react";

const API_KEY = "1c728bc";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          // resetting the error.
          setError("");
          setIsLoading(true);
          // When user input to search test for eg at first onChange will trigger to change the state and this will trigger to
          // fetch the movie with s=t and after user hits e key then s=te so on and so four which leads to a problem where
          // needed data is not coming, unneded api call and download , and if searching t takes long time then it will show data
          // of that query which reuslts at first which is called race condition.and also called debouncing.

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!res.ok) {
            throw new Error("Something went wrong while fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (error) {
          // when there is new request after keypress again the abortor throws error and that is being set however if the type is that then we have to not include it.
          if (error.name !== "AbortError") setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("Search for movies.");
        return;
      }

      fetchMovies();

      // when the query state is changed it triggers rerender and clean up also get called because of query dependency so when there is rerender
      // it calls the abort function to abort it.
      return () => controller.abort();

      //empty array in dependency array says that run whatever inside Effect hook when the component is  mounted or component instance is used.
      // depency in dependency array should be state or props.
    },
    [query]
  );

  return { movies, isLoading, error };
}
