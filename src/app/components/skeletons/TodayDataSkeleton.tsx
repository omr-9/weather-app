import React from 'react';
import DataContainer from '../DataContainer';


const TodayDataSkeleton = () => {
  return (
    <section className='space-y-4'>
      <div className='space-y-8'>
        {/* Skeleton for the date and calendar icon */}
        <h2 className='flex sm:text-2xl text-3xl sm:items-end sm:flex-row gap-1 font-semibold items-center flex-col'>
          <div className='flex items-center space-x-1'>
            <div className='w-6 h-6 dark:bg-gray-500 bg-gray-200 rounded-full animate-pulse'></div>
            <div className='w-24 h-6 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </h2>

        {/* Skeleton for the main temperature data */}
        <DataContainer className='gap-10 flex-col py-10 sm:flex-row px-3 sm:px-6 items-center bg-white dark:bg-gray-900'>
          <div className='flex flex-col items-center px-4 space-y-2 sm:space-y-1'>
            <div className='w-20 h-6 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
            <div className='w-24 h-12 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
            <div className='w-32 h-6 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
            <div className='w-40 h-6 dark:bg-gray-500 bg-gray-200rounded animate-pulse'></div>
          </div>
          <div className='flex justify-between pr-3 overflow-x-auto w-full gap-10 sm:gap-16 scrollbar-custom py-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex flex-col items-center gap-2 text-xs font-semibold justify-between'>
                <div className='w-12 h-4 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
                <div className='w-12 h-12 dark:bg-gray-500 bg-gray-200 rounded-full animate-pulse'></div>
                <div className='w-16 h-4 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
                <div className='w-12 h-4 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
              </div>
            ))}
          </div>
        </DataContainer>

        {/* Skeleton for the weather details */}
        <div className='flex gap-4'>
          <DataContainer className='w-fit justify-center flex-col space-y-4 px-4 items-center bg-blue-100 dark:bg-gray-900'>
            <div className='w-24 h-6 dark:bg-gray-500 bg-gray-200 rounded animate-pulse'></div>
            <div className='w-12 h-12 dark:bg-gray-500 bg-gray-200 rounded-full animate-pulse'></div>
          </DataContainer>
          <DataContainer className='flex justify-between gap-4 px-6 overflow-x-auto scrollbar-custom bg-yellow-200/80 dark:bg-gray-900/80'>

             
        <div className="flex gap-4 mx-20 justify-between ">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col mx-8 justify-between gap-4 px-6 overflow-x-auto scrollbar-custom  bg-yellow-200/80 dark:bg-gray-900/80">
              <div className="w-8 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="w-8 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
          </DataContainer>
        </div>
      </div>
    </section>
  );
};

export default TodayDataSkeleton;