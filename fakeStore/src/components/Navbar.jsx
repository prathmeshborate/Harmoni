import React, { useState, useEffect } from "react";
import Logo from '../assets/logo.png';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="bg-white w-full fixed shadow-md">
      <div className="p-3">
        <div className="container flex justify-between items-center">
          {/* Left: Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button className="text-xl lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo */}
            <a href="#" className="flex gap-2 font-semibold tracking-widest text-xl sm:text-2xl">
              <img src={Logo} alt="Logo" className="w-7 sm:w-9" />
              <span className="hidden lg:inline text-red-500">FakeShop</span>
            </a>
          </div>

          {/* Middle: Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-3">
            {MenuLinks.map((data, index) => (
              <li key={index}>
                <a
                  href={data.link}
                  className="px-3 font-semibold text-gray-500 hover:text-black text-sm md:text-base duration-200"
                  onClick={() => data.name === "Home" && onCategorySelect("")} // Reset category
                >
                  {data.name}
                </a>
              </li>
            ))}
              <li className="relative cursor-pointer group">
                <a href="#" className="flex items-center gap-[2px] font-semibold text-gray-500 text-sm md:text-base">
                  Categories
                  <FaCaretDown className="group-hover:rotate-180 duration-300" />
                </a>
                <div className="absolute z-[9999] hidden group-hover:block w-[180px] rounded-md bg-white shadow-md">
                  <ul className="space-y-1">
                    {DropdownLinks.map((data) => (
                      <li key={data.id}>
                        <a className="text-gray-500 text-sm duration-200 block w-full p-2 hover:bg-red-200 rounded-md" href={data.link}>
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Search Bar & Cart */}
          <div className="flex items-center gap-3">
            <div className="relative w-[140px] sm:w-[180px] lg:w-[260px]">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className="search-bar border border-gray-300 rounded-full px-3 py-1.5 w-full text-xs sm:text-sm focus:w-[180px] sm:focus:w-[240px]"
              />
              {suggestions.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="cursor-pointer p-2 hover:bg-gray-200 text-xs sm:text-sm"
                      onClick={() => handleCategorySelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <IoMdSearch className="text-lg text-gray-600 absolute top-1/2 -translate-y-1/2 right-2" />
            </div>

            {/* Cart Icon */}
            <button className="relative ml-4 p-2">
              <FaCartShopping className="text-lg text-gray-600" />
              {cartCount > 0 && (
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {cartCount}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-white shadow-md p-3">
            <ul className="space-y-2">
              {MenuLinks.map((data, index) => (
                <li key={index}>
                  <a
                    href={data.link}
                    className="block text-gray-500 hover:text-black text-sm"
                    onClick={() => data.name === "Home" && onCategorySelect("")} // Reset category for mobile
                  >
                    {data.name}
                  </a>
                </li>
              ))}
              <li className="relative">
                <button className="flex items-center w-full text-gray-500 text-sm">
                  Categories <FaCaretDown className="ml-1" />
                </button>
                <ul className="mt-2 pl-3 space-y-1">
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <a className="block text-gray-500 hover:text-black text-sm" href={data.link}>
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
