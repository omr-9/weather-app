/* eslint-disable */
import { BsFillCloudSunFill } from "react-icons/bs";
import { MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import DarkModeSwitch from "./DarkModeSwitch";
import SearchBox from "./SearchBox";
import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { locationCityAtom, placeAtom } from "../atom";

export const Navbar = ({ location }: { location: string }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(locationCityAtom);

  const handleChange = async (value: string) => {
    setCity(value);
    if (value.length > 2) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const suggestions = res.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setError("");
  };

  const handleSuggestionsClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);
    e.preventDefault();
    if (!suggestions.includes(city)) {
      setLoadingCity(false);
      setError("Location not found");
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  };
  return (
    <>
      <nav className="shadow-md sticky top-0 left-0 z-50 bg-gray-100  dark:bg-gray-900">
        <div className="w-full max-w-7xl mx-auto h-[80px] flex items-center justify-between px-3">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl text-gray-500 dark:text-gray-200">
              Weather
            </h2>
            <BsFillCloudSunFill className="text-3xl text-yellow-500 mt-1" />
          </div>
          <section className="flex items-center gap-3">
            {/* currnet location icon */}
            <MdMyLocation
              title="Current Location"
              onClick={handleCurrentLocation}
              className="text-3xl text-gray-600 dark:text-gray-200 cursor-pointer hover:opacity-80"
            />
            <div className="flex items-center">
              <MdOutlineLocationOn className="text-3xl text-gray-800 dark:text-gray-200" />
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {location}
              </p>
            </div>
            <div className="relative hidden sm:flex">
              <SearchBox
                onSubmit={(e) => handleSearchSubmit(e)}
                onChange={(e) => handleChange(e.target.value)}
                value={city}
              />
              <SuggestionsBox
                showSuggestions={showSuggestions}
                handleSuggestionsClick={handleSuggestionsClick}
                suggestions={suggestions}
                error={error}
              />
            </div>
            <DarkModeSwitch />
          </section>
        </div>
      </nav>
      <div className="relative  flex w-full  justify-center mx-auto sm:hidden">
        <SearchBox
          onSubmit={(e) => handleSearchSubmit(e)}
          onChange={(e) => handleChange(e.target.value)}
          value={city}
        />
        <SuggestionsBox
          showSuggestions={showSuggestions}
          handleSuggestionsClick={handleSuggestionsClick}
          suggestions={suggestions}
          error={error}
        />
      </div>
    </>
  );
};

function SuggestionsBox({
  showSuggestions,
  handleSuggestionsClick,
  suggestions,
  error,
}: {
  showSuggestions: boolean;
  handleSuggestionsClick: (value: string) => void;
  suggestions: string[];
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white dark:bg-gray-900 absolute border top-[44px]  translate-x-[-10%] sm:translate-x-0 sm:left-0 border-gray-300 dark:border-gray-600 rounded-md min-w-[230px] flex flex-col gap-1 py-2 px-2 z-50">
          {error && <li className="text-red-500 p-1">{error}</li>}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionsClick(item)}
              className="coursor-pointer hover:bg-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800 p-1 rounded"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
