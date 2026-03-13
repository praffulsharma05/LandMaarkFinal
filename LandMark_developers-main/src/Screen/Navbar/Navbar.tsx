import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
     
    { name: "Properties", path: "/Properties" },
    { name: "Wishlist", path: "/Wishlist" },
    { name: "TownShip", path: "/Township" },
    { name: "ABOUT", path: "/About" },
    { name: "CONTACT", path: "/contactUs" },
  ];

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 opacity-85 w-full z-9999 transition-all duration-500
  ${
    scrolled
      ? "bg-black/90 backdrop-blur-md py-2"
      : "bg-linear-to-r from-black/80 to-black/60 py-3"
  }`}
      >
        <div className="max-w-8xl mx-auto px-6 flex items-center justify-between">
          

          <Link to="/" className="flex items-center gap-2">
            <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=scale-down,q=100/YNqMEWZ1PXT9OR5G/untitled-removebg-preview---edited-ad0zeWFJjhv7eqm2.png"
              alt="Real Estate"
              className="h-20 object-contain"
            />
          </Link>
 
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4 text-sm tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-gray-300 hover:text-white transition duration-300 pb-2 ${
                  location.pathname === link.path ? "text-white" : ""
                }`}
              >
                {link.name}

                {/* Gold underline */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Book Button */}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black shadow-2xl transform transition-transform duration-500 z-9998 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 h-20 border-b border-gray-800">
          <span className="text-lg font-semibold text-white">Menu</span>

          <button aria-label="Close menu" onClick={() => setIsOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black/60 z-9997"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
