import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FullScreenNavbar = ({
  menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  bgColor = "#000000",
  hoverColor = "#ff0047",
  image = null,
}) => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuActive(!menuActive);

  return (
    <>
      <style>{`
        .nav-link span {
          transition: transform 0.5s ease-in-out;
        }
        .nav-item:hover .nav-link span {
          transform: translateY(-100%);
        }
        .nav-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: ${hoverColor};
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s ease-in-out;
          z-index: 0;
        }
        .nav-item:hover::before {
          transform: scaleY(1);
          transform-origin: top;
        }
        /* Menu items stacked vertically */
        .nav-items {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem; /* Adjust space between items */
        }
        /* Custom menu lines */
        .menu-toggle {
          width: 35px;
          height: 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          z-index: 50;
        }
        .menu-toggle div {
          width: 100%;
          height: 5px;
          background-color: white;
          transition: transform 0.3s ease;
          border-radius:10px;
        }
        .menu-toggle.active div:nth-child(1) {
          transform: rotate(45deg) translateY(14px);
        }
        .menu-toggle.active div:nth-child(2) {
          opacity: 0;
        }
        .menu-toggle.active div:nth-child(3) {
          transform: rotate(-45deg) translateY(-14px);
        }
      `}</style>

      {/* Menu Toggle (Custom Lines) */}
      <div
        className={`fixed top-5 right-5 w-14 h-14 z-50 cursor-pointer transition-all duration-300`}
        onClick={toggleMenu}
      >
        <div className={`menu-toggle ${menuActive ? "active" : ""}`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Fullscreen Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center transition-all duration-500 ${
          menuActive ? "translate-y-0 bg-black" : "-translate-y-full"
        }`}
      >
        {/* Optional Banner */}
        {image && (
          <div className="hidden lg:block w-[900px] h-full relative">
            <img
              src={image}
              alt="Banner"
              className="absolute w-full h-full object-cover"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex justify-center items-center w-full h-full overflow-y-auto">
          <ul className="nav-items text-center">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative px-6 py-1 inline-block overflow-hidden nav-item group"
                onClick={() => {
                  setMenuActive(false);
                  navigate(item.href);
                }}
              >
                <a
                  className="relative text-white text-[3rem] md:text-[4rem] font-bold uppercase leading-tight transition-transform duration-500 nav-link inline-block z-10 cursor-pointer"
                >
                  <span className="block relative z-10">{item.label}</span>
                  <span className="absolute left-0 bottom-[-100%] text-white w-full block">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default FullScreenNavbar;
