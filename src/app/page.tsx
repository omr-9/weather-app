'use client'
import { useQuery } from "react-query";
import Navbar from "./components/Navbar";
import axios from "axios";
import TodayData from "./components/TodayData";


export default function Home() {
  const {data, isLoading, error} = useQuery("repoData", async () => {
    const {data} = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Cairo&appid=${process.env.NEXT_PUBLIC_API_KEY}&cnt=80`
    );
    return data;
  });
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
  return (
    <div className="flex flex-col min-h-screen gap-4 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-3 w-full flex flex-col gap-10 pb-10 pt-4">

      <TodayData loadingCity={isLoading} data={data}/>
      </main>
    </div>
  );
}
