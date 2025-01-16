import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { searchParams, setSearchParams, handleSubmit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex flex-col justify-between my-10 mx-10 items-center md:flex-row">
        {/* Header Section */}
        <div
          className="bg-[#FF8C00] text-white select-none Ftext-3xl font-extrabold md:mt-3 p-3 text-center rounded-t-xl shadow-lg order-1 max-w-[230px] cursor-default "
          onClick={() => navigate("/")}
        >
          {/* <img src={logo} alt="" width={50} className="inline-flex max-" /> */}
          <span className="text-[#FFFFFF] text-3xl font-serif italic">
            Recipe
          </span>
          <span className="text-[#e6e953] text-2xl font-serif">Verse</span>
        </div>

        {/* Search Bar */}
        <div className="mt-5 drop-shadow-lg shadow-[#FF6347] w-full sm:max-w-[80%] md:max-w-[40%]  mx-auto rounded-xl order-3 md:order-2">
          <form action="" onSubmit={(e) => handleSubmit(e, navigate)}>
            <input
              type="text"
              placeholder="Search recipes..."
              className="px-6 py-3 rounded-xl outline-none w-full text-lg"
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
            />
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-10 mt-6 text-2xl font-semibold text-[#333333] order-2 md:order-3">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive ? "text-[#FF6347]" : ""
              } hover:text-[#FF6347] transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"favourites"}
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive ? "text-[#FF6347]" : ""
              } hover:text-[#FF6347] transition-colors`
            }
          >
            Favorites
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
