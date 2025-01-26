
import React from "react";
import DataContainer from "./DataContainer";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { ForecastWeatherDetailProps } from "@/types";
import { convertKelvinToCelsius } from "@/lib/convertKelvinToCelsius";
import DaysForcastSkeleton from "./skeletons/DaysForcastSkeleton";
interface DaysForcastProps extends ForecastWeatherDetailProps {
  loadingCity: boolean;
}
const DaysForcast = (props: DaysForcastProps) => {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    description,
    loadingCity,
   
  } = props;

  if(loadingCity) return <DaysForcastSkeleton />


  // console.log("temp_max",temp_max)
  return (
    <DataContainer className=" gap-4 bg-white dark:bg-gray-800">
      <section className="flex gap-1 px-4 items-center ">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatehrIcon} />
          <p className="text-base"> {day}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>

        <div className="flex flex-col px-4 items-center gap-2">
          <span className="text-4xl md:text-5xl">
            {convertKelvinToCelsius(temp ?? 0)}°
          </span>

          <div className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels Like </span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </div>

          <p className="capitalize text-[10px] whitespace-nowrap">
            {description}
          </p>
        </div>
      </section>
      <section className="flex pr-10 py-4 sm:py-0 justify-between overflow-x-auto scrollbar-custom w-full gap-4 px-4">
        <WeatherDetails {...props} />
      </section>
    </DataContainer>
  );
};

export default DaysForcast;