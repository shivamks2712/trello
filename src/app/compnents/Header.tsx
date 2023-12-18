"use client";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Avatar from "react-avatar";
import "./header.css";

function Header() {
  return (
    // navbar and searchbox
    <header>
      <div className="bg-gradient-to-b from-blue-400 via-blue-300 to-white-50 -z-10 pb-10 sm:pb-5">
        <div className="flex flex-col md:flex-row  items-center m align-middle justify-between px-5 sm:pb-2">
          <Image
            src="https://links.papareact.com/c2cdd5"
            alt="Trello Image"
            width={200}
            height={110}
            className="w-42 md:w-56 pt-1  md:pb-5 sm:pb-2 object-contain"
          />
          <div className="flex items-center md:space-x-5 px-2">
            <form className="flex items-center bg-white  space-x-0 sm:space-x-5 rounded-md mx-2 shadow-md flex-1 p-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none  mx-6 "
              />
              <button className="border-spacing-1  text-gray-500/70">
                Search
              </button>
            </form>
            <Avatar name="Foo Bar" round size="40px" />
          </div>
        </div>

        {/* Chat GPT status */}
        <div className="w-fit mx-auto mt-2 ">
          <p className="inline-flex items-center text-blue-600 text-sm  shadow-md px-2 rounded-xl bg-white ">
            <UserCircleIcon className="h-10 w-10 text-blue-800 mr-2 " />
            chat gpt is summarizing your task for the day
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
