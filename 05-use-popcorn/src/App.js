import { useEffect, useRef, useState } from "react";
import Rating from "./Rating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKeyPress } from "./useKeyPress";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  // useRef is a hook when used it stores a current value that is stored when the component mount to unmount.
  //also known as variable that stay sames in multiple renders unline let or const which is at inital value on re render.
  // used for creating variables that stays same between render and selecting and storing dom elements.
  //like useState when useRef value changes it doesn't rerender the component.

  const inputEl = useRef(null);
  useKeyPress("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumSearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function MovieListItem({ movie, selectedId, onSelectedId }) {
  return (
    <li
      onClick={() => onSelectedId(movie.imdbID)}
      className={selectedId === movie.imdbID ? "active-list-movie" : ""}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, selectedId, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem
          key={movie.imdbID}
          movie={movie}
          selectedId={selectedId}
          onSelectedId={onSelectedId}
        />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedBoxListItem({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}

function WatchedBoxList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedBoxListItem
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function MovieDetails({ selectedId, onCloseDetail, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  useKeyPress("Escape", onCloseDetail);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAddWatch() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
    };

    onAddWatched(newWatchedMovie);
    onCloseDetail();
  }

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Year: year,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  // Better to seperate for individual effect above one is for api call  and this for title
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      // cleanup function to set back the title to the original after component unmounts.
      return () => {
        document.title = "Use popcorn.";
        // the useEffect hook will run after the component is mounted or unmounted so when i log the title
        // in the console it will still remeber the title this is because of closure ( the function will rember the variable
        // that were present in the time and place where the function was created. )
        // console.log(`Clean up function for ${title}`);
      };
    },

    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseDetail}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated this movie with {watchedUserRating}
                  {""} stars
                </p>
              ) : (
                <>
                  <Rating size={24} maxStar={10} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatch}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">⛔️ {message}</p>;
}

const API_KEY = "1c728bc";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  // In useState the value passed on at the beginning is only shown when the component mounts.
  // we can pass a pure function (which will return only one value , which donot have parameters) and return the value
  // const [watched, setWatched] = useState(function () {
  //   const storageData = localStorage.getItem("watched");
  //   return JSON.parse(storageData) || [];
  // });

  const [watched, setWatched] = useLocalStorageState("watched");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseDetail() {
    setSelectedId(null);
  }

  function handleSetWatched(movie) {
    setWatched((watchedMovies) => [...watchedMovies, movie]);

    // not doing here because when we want to remove from local storage we have to use the same method in handleDelete also.
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumSearchResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {!error && !isLoading && (
            <MovieList
              movies={movies}
              onSelectedId={handleSelectedId}
              selectedId={selectedId}
            />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseDetail={handleCloseDetail}
              onAddWatched={handleSetWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedBoxList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// Hooks are special kinds of methods or Api that we can use to change the internal things, dom,  in react like state props from the fiber tree.
