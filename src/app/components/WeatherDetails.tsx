
import { SingleWeatherDetailProps, WeatherDetailProps } from '@/types';
import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu'
import { MdAir } from 'react-icons/md';

const WeatherDetails = (props:WeatherDetailProps) => {
    const {
        visability = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6.20",
        sunset = "18:48"
      } = props;
  return (
    <>
      <SingleWeatherDetails icon={<LuEye />}  information='Visibility' value={visability}/>
      <SingleWeatherDetails icon={<FiDroplet />}  information='Humidity' value={humidity}/>
      <SingleWeatherDetails icon={<MdAir />}  information='Wind Speed' value={windSpeed}/>
      <SingleWeatherDetails icon={<ImMeter />}  information='Air Pressure' value={airPressure}/>
      <SingleWeatherDetails icon={<LuSunrise />}  information='Sunrise' value={sunrise}/>
      <SingleWeatherDetails icon={<LuSunset />}  information='Sunset' value={sunset}/>
    </>
  )
}

export default WeatherDetails


const SingleWeatherDetails = (props : SingleWeatherDetailProps) => {
    return (
                <div className='flex flex-col items-center gap-2 justify-between text-black/80 font-semibold text-xs'>

                    <p className='whitespace-nowrap dark:text-gray-200'>{props.information}</p>
                    <div className='dark:text-gray-200 text-3xl'>{props.icon}</div>
                    <p className='dark:text-gray-200 whitespace-nowrap '>{props.value}</p>
                </div>
    )
}