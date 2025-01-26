import React from "react";
import DataContainer from "../DataContainer";

const DaysForcastSkeleton = () => {
  return (
    <DataContainer className="gap-4 bg-white dark:bg-gray-800">
      <section className="flex gap-1 px-4 items-center">
        {/* Weather Icon Skeleton */}
        <div className="flex flex-col gap-1 items-center">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-12 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Temperature Skeleton */}
        <div className="flex flex-col px-4 items-center gap-2">
          <div className="w-16 h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-24 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </section>

      {/* Weather Details Skeleton */}
      <section className="flex pr-10 py-4 sm:py-0 justify-between overflow-x-auto scrollbar-custom w-full  gap-4 px-4">
        <div className="flex gap-4 ">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col mx-10 items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="w-12 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-8 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </DataContainer>
  );
};

export default DaysForcastSkeleton;