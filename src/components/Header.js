import React from "react";
import logo from "../assets/vaporlogo.svg";
import Button from "./Button";
// import Button2 from "./Button2"; // Make sure to import Button2

const Header = () => {

  const handleClick = () => {
    window.location.href = "https://github.com/Yashchauhan008/vapor-ui";
  };

  return (
    <>
      <div className="header pl-4 pr-12 sm:px-10">
        <div className="logo text-2xl sm:text-3xl">
          <img className="sm:scale-100 scale-75" src={logo} alt="" />
          vapor ui
        </div>
        <div className="rheader">
          {/* Button1 - Show only on desktop (lg and above) */}
          <div className="hidden sm:block">
            <Button />
          </div>

          {/* Button2 - Show only on mobile/tablet (below lg) */}
          <div className="block sm:hidden">
            <button onClick={handleClick} className="flex items-center gap-2 m-4 rounded-full p-2">
              <svg
                viewBox="0 0 24 24"
                height="33"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
                fill="#01EBFF"
                // className="scale-90"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              {/* <svg
                aria-hidden="true"
                fill="#ffff00"
                viewBox="0 0 47.94 47.94"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                class="staricon"
              >
                <path
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
      c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
      c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
      c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
      c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
      C22.602,0.567,25.338,0.567,26.285,2.486z"
                ></path>
              </svg> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
