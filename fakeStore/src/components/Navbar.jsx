import React, { useState, useEffect } from "react";
import Logo from '../assets/logo.png';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";

const MenuLinks = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Shop", link: "/#shop" },
  { id: 3, name: "About", link: "/#about" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/#" },
  { id: 2, name: "Best Selling", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];

const Navbar = ({ cartCount, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      const filteredSuggestions = categories.filter(category => 
        category.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleCategorySelect = (category) => {
    setQuery(category);
    setSuggestions([]);
    onCategorySelect(category);
  };

  return (
    <div className="bg-white w-full fixed">
      <div className="p-4 ml-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#" className="flex gap-2 font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
              <img src={Logo} alt="Logo" className='w-10'/>
              <span className="hidden sm:inline text-red-500">FakeShop</span> {/* Hide "FakeShop" text on small screens */}
            </a>
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a href={data.link} className="inline-block px-4 font-semibold text-gray-500 hover:text-black text-sm md:text-base duration-200">
                      {data.name}
                    </a>
                  </li>
                ))}
                <li className="relative cursor-pointer group">
                  <a href="#" className="flex items-center gap-[2px] font-semibold text-gray-500 py-2 text-sm md:text-base">
                    Categories
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data) => (
                        <li key={data.id}>
                          <a className="text-gray-500 duration-200 inline-block w-full p-2 hover:bg-red-200 rounded-md font-semibold" href={data.link}>
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={query}
                onChange={handleSearch}
                className="search-bar border border-gray-300 rounded-lg p-2 text-sm md:text-base"
              />
              {suggestions.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="cursor-pointer p-2 hover:bg-gray-200 text-sm md:text-base"
                      onClick={() => handleCategorySelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <IoMdSearch className="text-xl text-gray-600 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>
            <button className="relative p-3">
              <FaCartShopping className="text-xl text-gray-600" />
              {cartCount > 0 && (
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {cartCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
