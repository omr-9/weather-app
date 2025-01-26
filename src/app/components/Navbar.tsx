import { BsFillCloudSunFill } from "react-icons/bs";
import { MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import DarkModeSwitch from "./DarkModeSwitch";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <>
    <nav className="shadow-md sticky top-0 left-0 z-50 bg-gray-100  dark:bg-gray-900">
    <div className="w-full max-w-7xl mx-auto h-[80px] flex items-center justify-between px-3">
    <div className="flex items-center justify-center gap-2">
     <h2 className="text-3xl text-gray-500 dark:text-gray-200">Weather</h2>
     <BsFillCloudSunFill className="text-3xl text-yellow-500 mt-1" />
    </div>
    <section className="flex items-center gap-3">
     {/* currnet location icon */}
     <MdMyLocation title="Current Location" className="text-3xl text-gray-500 dark:text-gray-200 cursor-pointer hover:opacity-80" />
     <div className="flex items-center">
       <MdOutlineLocationOn className="text-3xl text-gray-500 dark:text-gray-200" />
       <p className="text-sm text-gray-500 dark:text-gray-200">
         {/* {location} */}
         Cairo 
       </p>
     </div>
     <div className="relative hidden sm:flex">
     
     <SearchBox />
     </div>
     <DarkModeSwitch />
    </section>
    </div>
    </nav>
    </>
  )
}

export default Navbar
