import CardGrid from "@/components/weekCards";
import React from "react";

export default function WeekMeals() {
  return (
    <div className="bg-gray-900 w-full min-h-screen px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80 py-5">
      {/* <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-gray-800 font-bold mt-8 mb-4">
        Weekly
      </h3> */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-400 font-bold mb-4">
        Meal Planner
      </h3>

      <CardGrid />
    </div>
  );
}
