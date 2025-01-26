
import { WeatherData } from '@/types'
import { format, fromUnixTime, parseISO } from 'date-fns'
import React from 'react'
import { CiCalendar } from 'react-icons/ci'
import TodayDataSkeleton from './skeletons/TodayDataSkeleton'
import DataContainer from './DataContainer'
import { convertKelvinToCelsius } from '@/lib/convertKelvinToCelsius'
import { metersToKilometers } from '@/lib/metersToKilometers'
import { convertWindSpeed } from '@/lib/convertWindSpeed'
import WeatherIcon from './WeatherIcon'
import WeatherDetails from './WeatherDetails'

const TodayData = ({data,loadingCity}:{data:WeatherData,loadingCity:boolean}) => {
    const firstData = data.list[0]
    console.log('firstData',firstData)
    const currentTime = new Date();
    const formattedTime = format(currentTime, "HH:mm a");
    if(loadingCity) return <TodayDataSkeleton />
  return (
    <div>
        <section className=' space-y-4'>
      <div className='space-y-8 '>
        <h2 className='flex sm:text-2xl text-3xl sm:items-end sm:flex-row gap-1 font-semibold items-center flex-col '>
        <div className='flex items-center space-x-1'>
        <CiCalendar /> 
        <p>{format(parseISO(firstData?.dt_txt ?? ''), "EEEE")} <sub className='text-xs'>({format(parseISO(firstData?.dt_txt ?? ''), "dd.MM.yyyy")})</sub> </p>
        </div>
        </h2>
        <DataContainer className='gap-10 flex-col py-10 sm:flex-row px-3 sm:px-6 items-center bg-white dark:bg-gray-900 '>
          <div className='flex flex-col items-center px-4 space-y-2 sm:space-y-1'>
            <span className='text-lg  text-gray-600 dark:text-gray-400 whitespace-nowrap'>
              {formattedTime}
            </span>
            <span className='sm:text-6xl text-7xl'>
              {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
            </span>
            <div className='sm:text-sm text-gray-600 dark:text-gray-400 text-lg  space-x-1 whitespace-nowrap'>
              <span>Feels Like</span>
              <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°</span>
            </div>
            <div className='space-x-2 sm:text-md text-lg'>
              <span>
                {convertKelvinToCelsius(firstData.main.temp_min ?? 0)}°↓
              </span>
              <span>
                {convertKelvinToCelsius(firstData.main.temp_max ?? 0)}°↑
              </span>
            </div>
          </div>
          <div className='flex justify-between pr-3 overflow-x-auto w-full gap-10 sm:gap-16 scrollbar-custom py-4'>
            {data.list.map((d, i) => (
              <div key={i} className='flex flex-col items-center gap-2 text-xs font-semibold justify-between'>
                <p className='whitespace-nowrap'>{format(parseISO(d.dt_txt ?? ''), "HH:mm a")}</p>
               <WeatherIcon iconName={d.weather[0].icon} />
               <p className='whitespace-nowrap text-xs '>{d.weather[0].description}</p>
                <p className='whitespace-nowrap'>{convertKelvinToCelsius(d.main.temp ?? 0) }°</p>
              </div>
            ))}

          </div>
         

        </DataContainer>
        <div className='flex gap-4'>
          {/* left box */}
          <DataContainer className='w-fit justify-center flex-col px-4 items-center  bg-blue-100 dark:bg-gray-900 '>
            <p className='capitalize whitespace-nowrap'>{firstData.weather[0].description}</p>
          <WeatherIcon iconName={firstData.weather[0].icon ?? '' } />

          </DataContainer>
          {/* right box */}
          <DataContainer className=' justify-between gap-4 px-6 overflow-x-auto scrollbar-custom  bg-yellow-200/80 dark:bg-gray-900/80 '>
               <WeatherDetails
                    visability={metersToKilometers(firstData.visibility ?? 10000)}
                    airPressure={`${firstData.main.pressure} hPa`}
                    humidity={`${firstData.main.humidity}%`}
                  sunrise={format(fromUnixTime(data.city.sunrise ?? 0), "HH:mm a")}
                    sunset={format(fromUnixTime(data.city.sunset ?? 0), "HH:mm a")}
                    windSpeed={`${convertWindSpeed(firstData.wind.speed ?? 0)}`}
                  />

          </DataContainer>

        </div>
      </div>
    </section>
    </div>
  )
}

export default TodayData
