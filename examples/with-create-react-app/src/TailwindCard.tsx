// @ts-nocheck
import React from 'react'

function TailwindCard() {

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined">
        <div className="h-full w-full">
          <div className="relative w-full">
            <img
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              alt=""
            />
            <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
              <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div className="mb-3 flex items-center justify-between px-1 md:items-start">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700"> Abstract Colors </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                By Esther Jackson
              </p>
            </div>
            <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
                      <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                        +5
                      </span>
              <span
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white"
              >
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                          alt=""
                        />
                      </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                          <img
                            className="h-full w-full rounded-full object-cover"
                            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
                            alt=""
                          />
                      </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                          <img
                            className="h-full w-full rounded-full object-cover"
                            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png"
                            alt=""
                          />
                      </span>
            </div>
          </div>
          <div className="flex items-center justify-between md:items-center lg:justify-between ">
            <div className="flex">
              <p className="!mb-0 text-sm font-bold text-brand-500">
                Current Bid: 0.91 <span>ETH</span>
              </p>
            </div>
            <button
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TailwindCard
