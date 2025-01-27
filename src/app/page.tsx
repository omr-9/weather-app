/* eslint-disable */
'use client'
import { useQuery } from "react-query";
import axios from "axios";
import TodayData from "./components/TodayData";
import DaysForcast from "./components/DaysForcast";
import { format } from "date-fns";
import { fromUnixTime, parseISO } from "date-fns";
import { metersToKilometers } from "@/lib/metersToKilometers";
import { convertWindSpeed } from "@/lib/convertWindSpeed";
import { Navbar } from "./components/Navbar";
import { useAtom } from "jotai";
import { locationCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";


export default function Home() {
  const [place, setPlace ]= useAtom(placeAtom)
  const [loadingCity, setLoadingCity] = useAtom(locationCityAtom)
  const {data, isLoading, error,refetch} = useQuery("repoData", async () => {
    const {data} = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_API_KEY}&cnt=80`
    );
    return data;
  });
  useEffect(() => {
    refetch();
  },[place,refetch])
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <p className="text-3xl font-bold animate-pulse">Loading...</p>
      </div>
    );
    
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <p className="text-3xl font-bold text-red-500">Error loading data</p>
      </div>
    );
    const daysForcast = data.list.reduce((acc: any, current: any) => {
      const date = format(parseISO(current.dt_txt), "yyyy-MM-dd");
      
      if (!acc.some((item: any) => item.date === date)) {
        acc.push({
          date: date,
          data: [current],
        });
      } else {
        const index = acc.findIndex((item: any) => item.date === date);
        acc[index].data.push(current);
      }
  
      return acc;
    }, []);
  return (
    <div className="flex flex-col min-h-screen gap-4 bg-gray-50 dark:bg-gray-900">
      <Navbar location={data.city.name} />
      <main className="max-w-7xl mx-auto px-3 w-full flex flex-col gap-10 pb-10 pt-4">

      <TodayData loadingCity={loadingCity} data={data}/>
      <section className="flex w-full flex-col gap-4">
          <p className="text-2xl font-semibold">{daysForcast.length}-Day Forecast </p>
          {daysForcast.map((day: any, i: number) => {
            const dayData = day.data[0];
            return (
              <DaysForcast
                loadingCity={isLoading}
                key={i}
                description={dayData?.weather[0]?.description ?? ""}
                weatehrIcon={dayData?.weather[0]?.icon ?? "01d"}
                day={format(parseISO(dayData.dt_txt), "EEEE")}
                date={format(parseISO(dayData.dt_txt), "dd.MM.yyyy")}
                feels_like={dayData?.main.feels_like ?? 0}
                temp={dayData?.main.temp ?? 0}
                temp_max={dayData?.main.temp_max ?? 0}
                temp_min={dayData?.main.temp_min ?? 0}
                airPressure={`${dayData?.main.pressure} hPa `}
                humidity={`${dayData?.main.humidity}% `}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702517657),
                  "H:mm a"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  "H:mm a"
                )}
                visability={metersToKilometers(dayData?.visibility ?? 10000)}
                // visibility={`${metersToKilometers(dayData?.visibility ?? 10000)} `}
                windSpeed={`${convertWindSpeed(dayData?.wind.speed ?? 1.64)} `}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}
