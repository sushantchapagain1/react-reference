import { useCallback } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(currentState, action) {
  switch (action.type) {
    case "loading":
      return { ...currentState, isLoading: true };

    case "cities/loaded":
      return { ...currentState, cities: action.payload, isLoading: false };

    case "city/loaded":
      return { ...currentState, currentCity: action.payload, isLoading: false };

    case "city/created":
      return {
        ...currentState,
        isLoading: false,
        cities: [...currentState.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...currentState,
        isLoading: false,
        cities: currentState.cities.filter(
          (city) => city.id !== action.payload
        ),
        currentCity: {},
      };

    case "rejected":
      return { ...currentState, isLoading: false, error: action.payload };

    default:
      throw new Error("Invalid action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Something went wrong" });
      }
    }
    fetchCities();
  }, []);

  const getCurrentCity = useCallback(
    async function getCurrentCity(id) {
      if (+id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Something went wrong" });
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong" });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context must be used inside Cities provider");
  return context;
}

export { CitiesProvider, useCities };
