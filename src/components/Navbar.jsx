import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { searchParams, setSearchParams, handleSubmit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <>
      <nav className="mx-10 my-10 flex flex-col items-center justify-between md:flex-row">
        {/* Header Section */}
        <div
          className="Ftext-3xl order-1 max-w-[230px] cursor-default select-none rounded-t-xl bg-[#FF8C00] p-3 text-center font-extrabold text-white shadow-lg md:mt-3"
          onClick={() => navigate("/")}
        >
          {/* <img src={logo} alt="" width={50} className="inline-flex max-" /> */}
          <span className="font-serif text-3xl italic text-[#FFFFFF]">
            Recipe
          </span>
          <span className="font-serif text-2xl text-[#e6e953]">Verse</span>
        </div>

        {/* Search Bar */}
        <div className="order-3 mx-auto mt-5 w-full rounded-xl shadow-[#FF6347] drop-shadow-lg sm:max-w-[80%] md:order-2 md:max-w-[40%]">
          <form action="" onSubmit={(e) => handleSubmit(e, navigate)}>
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full rounded-xl px-6 py-3 text-lg outline-none"
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
            />
          </form>
        </div>

        {/* Navigation Links */}
        <div className="order-2 mt-6 flex justify-center gap-10 text-2xl font-semibold text-[#333333] md:order-3">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive ? "text-[#FF6347]" : ""
              } transition-colors hover:text-[#FF6347]`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"favourites"}
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive ? "text-[#FF6347]" : ""
              } transition-colors hover:text-[#FF6347]`
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
